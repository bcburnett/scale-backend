import "redux-thunk";
export const INIT_APP ='INIT_APP';
export const initApp = ()=>{
  return {
    type: INIT_APP,
    myapp: 'Scale Browser Interface',
  };
};

export const JSON_UPDATE = 'JSON_UPDATE';
export const jsonUpdate = (json,ten) => {
  console.log(state.tenWeight);
  console.log(json.weight)
  return {
    type: JSON_UPDATE,
    json,
    count: Number(json.weight) / (ten/10),
  };
};

export const SCALE_TENWEIGHT = 'SCALE_TENWEIGHT';
export const scaleTenWeight = (tenWeight) => {
  return {
    type: SCALE_TENWEIGHT,
    tenWeight,
    count: Number(json.weight) / (tenWeight / 10),
  };
};