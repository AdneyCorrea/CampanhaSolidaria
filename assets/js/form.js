import { loadParticipationPreferences, saveParticipationPreferences } from './storage.js';

export function initializeForm() {
  const form = document.querySelector('#cadastro-form');
  if (!form || form.dataset.initialized) return;
  form.dataset.initialized = 'true';

  const toast = document.querySelector('#form-toast');
  const toastMessage = document.querySelector('#toast-message');
  let toastTimer;
  const showToast = (message) => {
    toastMessage.textContent = message;
    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => { toast.hidden = true; }, 6000);
  };
  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.hidden = true;
    window.clearTimeout(toastTimer);
  });

  const interestInputs = [...form.querySelectorAll('input[name="interesse"]')];
  const savedInterests = loadParticipationPreferences();
  interestInputs.forEach((input) => { input.checked = savedInterests.includes(input.value); });

  interestInputs.forEach((input) => {
    input.addEventListener('change', () => {
      const selected = interestInputs.filter((option) => option.checked).map((option) => option.value);
      const feedback = document.querySelector('#form-feedback');
      feedback.textContent = saveParticipationPreferences(selected)
        ? 'Preferências de participação salvas neste navegador.'
        : 'Não foi possível salvar as preferências neste navegador.';
    });
  });

  const onlyDigits = (value) => value.replace(/\D/g, '');
  const maskCpf = (value) => onlyDigits(value).slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  const maskPhone = (value) => {
    const digits = onlyDigits(value).slice(0, 11);
    if (!digits) return '';
    const area = digits.slice(0, 2);
    const number = digits.slice(2);
    if (digits.length <= 2) return `(${area}`;
    if (number.length <= 4) return `(${area}) ${number}`;
    const split = number.length > 8 ? 5 : 4;
    return `(${area}) ${number.slice(0, split)}-${number.slice(split)}`;
  };
  const maskCep = (value) => onlyDigits(value).slice(0, 8)
    .replace(/(\d{5})(\d)/, '$1-$2');

  const bindMask = (id, formatter) => {
    const input = document.getElementById(id);
    input.addEventListener('input', () => {
      const start = input.selectionStart;
      const before = input.value;
      input.value = formatter(before);
      const delta = input.value.length - before.length;
      const cursor = Math.max(0, (start ?? input.value.length) + delta);
      input.setSelectionRange(cursor, cursor);
    });
  };

  bindMask('cpf', maskCpf);
  bindMask('telefone', maskPhone);
  bindMask('cep', maskCep);

  const validatedFields = [...form.querySelectorAll('.field input:not([type="checkbox"]), .field select, .field textarea')];
  const touchedFields = new WeakSet();
  const cpfHasValidDigits = (value) => {
    const digits = onlyDigits(value);
    if (digits.length !== 11 || /^([0-9])\1{10}$/.test(digits)) return false;
    const digit = (slice, factor) => {
      const total = slice.split('').reduce((sum, number, index) => sum + Number(number) * (factor - index), 0);
      const remainder = (total * 10) % 11;
      return remainder === 10 ? 0 : remainder;
    };
    return digit(digits.slice(0, 9), 10) === Number(digits[9]) &&
      digit(digits.slice(0, 10), 11) === Number(digits[10]);
  };

  const messageFor = (field) => {
    field.setCustomValidity('');
    if (field.required && typeof field.value === 'string' && field.value.length > 0 && field.value.trim() === '') {
      field.setCustomValidity('Este campo é obrigatório.');
    }
    if (field.id === 'cpf' && field.value && !field.validity.patternMismatch && !cpfHasValidDigits(field.value)) {
      field.setCustomValidity('Confira os números do CPF e os dígitos verificadores.');
    }
    if (field.validity.valueMissing) return 'Este campo é obrigatório.';
    if (field.validity.typeMismatch) return 'Informe um valor no formato solicitado.';
    if (field.validity.patternMismatch) {
      if (field.id === 'cpf') return 'Digite um CPF com 11 números e formato 000.000.000-00.';
      if (field.id === 'telefone') return 'Use o formato (11) 91234-5678.';
      if (field.id === 'cep') return 'Digite um CEP com 8 números, por exemplo 00000-000.';
      return field.title || 'Confira o formato informado.';
    }
    if (field.validity.tooShort) return `Informe pelo menos ${field.minLength} caracteres.`;
    if (field.validity.rangeOverflow) return 'A data deve ser igual ou anterior à data de hoje.';
    if (field.validity.customError) return field.validationMessage;
    return '';
  };

  const updateFieldState = (field) => {
    const message = messageFor(field);
    let feedback = document.getElementById(`${field.id}-feedback`);
    if (!feedback) {
      feedback = document.createElement('span');
      feedback.id = `${field.id}-feedback`;
      feedback.className = 'field-message';
      feedback.setAttribute('aria-live', 'polite');
      field.insertAdjacentElement('afterend', feedback);
    }
    const describedBy = new Set((field.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean));
    describedBy.add(feedback.id);
    field.setAttribute('aria-describedby', [...describedBy].join(' '));

    field.classList.toggle('is-invalid', Boolean(message));
    field.classList.toggle('is-valid', !message && Boolean(field.value));
    if (message) {
      field.setAttribute('aria-invalid', 'true');
      feedback.textContent = message;
      feedback.classList.add('field-message-error');
      feedback.classList.remove('field-message-success');
    } else {
      field.removeAttribute('aria-invalid');
      feedback.textContent = field.value ? 'Tudo certo.' : '';
      feedback.classList.toggle('field-message-success', Boolean(field.value));
      feedback.classList.remove('field-message-error');
    }
    return !message;
  };

  validatedFields.forEach((field) => {
    field.classList.add('field-control');
    field.addEventListener('input', () => {
      if (touchedFields.has(field) || field.value) {
        touchedFields.add(field);
        updateFieldState(field);
      }
    });
    field.addEventListener('change', () => {
      if (touchedFields.has(field) || field.value) {
        touchedFields.add(field);
        updateFieldState(field);
      }
    });
    field.addEventListener('blur', () => {
      touchedFields.add(field);
      updateFieldState(field);
    });
  });

  form.addEventListener('invalid', (event) => {
    const field = event.target;
    if (validatedFields.includes(field)) {
      touchedFields.add(field);
      updateFieldState(field);
    }
  }, true);

  const birthDate = document.querySelector('#nascimento');
  const today = new Date();
  birthDate.max = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString().slice(0, 10);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const feedback = document.querySelector('#form-feedback');
    const interests = form.querySelectorAll('input[name="interesse"]:checked');
    if (!interests.length) {
      feedback.textContent = 'Selecione ao menos uma forma de participação.';
      showToast('Selecione ao menos uma forma de participação.');
      form.querySelector('input[name="interesse"]').focus();
      return;
    }
    validatedFields.forEach((field) => {
      touchedFields.add(field);
      updateFieldState(field);
    });
    if (!form.reportValidity()) return;
    feedback.textContent = 'Cadastro demonstrativo validado. Nenhum dado foi enviado ou armazenado.';
    showToast('Cadastro validado. Nenhum dado foi enviado ou armazenado.');
  });
}
