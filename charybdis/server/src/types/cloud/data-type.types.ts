/**
 * Representation of a data type in the cloud database.
 */
export interface DataType {
  name: string; // unique id
  unit: string; // e.g. "V (Volts), "A (Amps)", "C (Celsius)"
  nodeName: string;
  data: Data[];
}
