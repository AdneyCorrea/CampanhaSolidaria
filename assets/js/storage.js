const STORAGE_KEY = 'maosTransformam.interesses';
const VALID_INTERESTS = new Set(['voluntariado', 'doacao', 'parceria']);

export function loadParticipationPreferences() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(saved)) return [];
    return [...new Set(saved.filter((value) => VALID_INTERESTS.has(value)))];
  } catch (error) {
    console.warn('Não foi possível recuperar as preferências salvas neste navegador.', error);
    return [];
  }
}

export function saveParticipationPreferences(values) {
  try {
    const safeValues = [...new Set(values.filter((value) => VALID_INTERESTS.has(value)))];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeValues));
    return true;
  } catch (error) {
    console.warn('Não foi possível salvar as preferências neste navegador.', error);
    return false;
  }
}
