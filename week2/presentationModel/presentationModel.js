import { Observable } from "../observable/observable.js";
import { id } from "../church/church.js";

export { Attribute };

const Attribute = (value) => {
  const valueObs = Observable(value);
  const validObs = Observable(true);

  // todo: add required functions here
  let converter = id;
  let validator = (x) => true;

  const setConverter = (newConv) => {
    converter = newConv;
    setConvertedValue(valueObs.getValue());
  };

  const revalidate = () => {
    validObs.setValue(validator(valueObs.getValue()));
  };

  const setValidator = (newVal) => {
    validator = newVal;
    revalidate();
  };

  valueObs.onChange((value) => revalidate());

  const setConvertedValue = (newVal) => {
    valueObs.setValue(converter(newVal));
  };

  return { valueObs, validObs, setConverter, setValidator, setConvertedValue };
};
