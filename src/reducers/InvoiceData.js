const initialState = {
  invoiceDetails: [],
  selected: [],
  selectedData: [],
  page: 1,
  searchText: "",
};

const invoice = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DATA":
      return {
        ...state,
        invoiceDetails: [...state.invoiceDetails, ...action.data],
      };
    case "SELECT":
      console.log(action.data[action.data.length - 1]);
      let selectedInvoice = state.invoiceDetails.filter((item) => {
        return action.data.includes(item.docId);
      });
      return {
        ...state,
        selected: [...action.data],
        selectedData: selectedInvoice,
      };
    case "SEARCH":
      return {
        ...state,
        invoiceDetails: [...action.data],
        selected: [],
        selectedData: [],
      };
    case "SEARCHTEXT":
      return {
        ...state,
        searchText: action.data,
      };
    case "DELETE":
      const updatedInvoice = state.invoiceDetails.filter((item) => {
        return !state.selected.includes(item.docId);
      });
      return {
        ...state,
        invoiceDetails: updatedInvoice,
        selected: [],
        selectedData: [],
      };
    case "EDIT":
      console.log(action);
      const update = [...state.invoiceDetails];
      for (let i = 0; i < update.length; i++) {
        if (update[i].docId === action.id) {
          console.log("pp");
          update[i].totalOpenAmount = action.amount;
          update[i].notes = action.notes;
          console.log(update[i]);
          break;
        }
      }

      return {
        ...state,
        invoiceDetails: update,
      };
    case "ADD_NEW":
      const add = [...state.invoiceDetails];
      add.splice(29, 0, action.data);
      return {
        ...state,
        invoiceDetails: add,
      };

    default:
      return state;
  }
};

export default invoice;
