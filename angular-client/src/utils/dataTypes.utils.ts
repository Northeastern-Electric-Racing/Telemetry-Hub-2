import { DataType, Node } from './types.utils';

export const dataTypesToNodes = (dataTypes: DataType[]) => {
  let addedDataType = false;
  const nodes: Node[] = [];
  dataTypes.forEach((dataType: DataType) => {
    addedDataType = false;
    nodes.forEach((node: Node) => {
      if (node.name === getNodeNameFromDataType(dataType)) {
        node.dataTypes.push(dataType);
        addedDataType = true;
      }
    });
    if (!addedDataType) {
      nodes.push({ name: getNodeNameFromDataType(dataType), dataTypes: [dataType] });
    }
  });

  return nodes;
};

export const getNodeNameFromDataType = (dataType: DataType) => {
  return dataType.name.split('/')[0];
};

export const dataTypeNamePipe = (dataTypeName: string) => {
  const updatedNameArray = dataTypeName.split('/');
  updatedNameArray.shift();
  const updatedName = updatedNameArray.join('-');
  return updatedName;
};
