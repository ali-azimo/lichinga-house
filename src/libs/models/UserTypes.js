// libs/models/UserTypes.js
export const USER_ROLES = {
  USER: 'user',
  PROPERTY_CREATOR: 'property_creator',
  ADMIN: 'admin'
};

export const PROPERTY_TYPES = {
  VENDA: 'venda',
  ARRENDAMENTO: 'arrendamento',
  TERRENO: 'terreno',
  CAMPO: 'campo'
};

export const PROPERTY_CATEGORIES = {
  RESIDENCIAL: 'residencial',
  COMERCIAL: 'comercial',
  RURAL: 'rural',
  INDUSTRIAL: 'industrial'
};

export const PROPERTY_STATUS = {
  ACTIVE: 'active',
  SOLD: 'sold',
  RENTED: 'rented',
  INACTIVE: 'inactive'
};

export const MESSAGE_TYPES = {
  INQUIRY: 'inquiry',
  RESPONSE: 'response',
  NOTIFICATION: 'notification'
};

export const MESSAGE_STATUS = {
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read'
};