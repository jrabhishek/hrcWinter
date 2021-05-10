export const addToInvoice = (data) => ({
  type: "ADD_DATA",
  data,
});

export const addToSelected = (data) => ({
  type: "SELECT",
  data,
});

export const searchInvoice = (data) => ({
  type: "SEARCH",
  data,
});
export const setSearchText = (data) => ({
  type: "SEARCHTEXT",
  data,
});
export const deleteInvoice = () => ({
  type: "DELETE",
});
export const editInvoice = (id, amount, notes) => ({
  type: "EDIT",
  id,
  amount,
  notes,
});
export const addNewInvoice = (data) => ({
  type: "ADD_NEW",
  data,
});
