const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

module.exports.findAll = async () => {
  const queryString = "CALL Proc_class_findAll()";
  const [[result]] = await pool.execute(queryString);
  return result;
};

module.exports.findOne = async (classRoomId) => {
  const queryString = "CALL Proc_class_findOne(?)";
  const [[[result]]] = await pool.execute(queryString, [classRoomId]);
  return result;
};

module.exports.remove = async (classRoomId) => {
  const queryString = "CALL Proc_class_remove(?)";
  const [result] = await pool.execute(queryString, [classRoomId]);
  return result;
};

module.exports.create = async (classObj) => {
  const { ClassName, CreatedBy } = classObj;
  const queryString = "CALL Proc_class_create(?, ?, ?)";

  const [result] = await pool.execute(queryString, [
    uuidv4(),
    ClassName,
    CreatedBy,
  ]);

  return result;
};

module.exports.update = async (classId, classObj) => {
  const { ClassName, ModifiedBy } = classObj;
  const queryString = "CALL Proc_class_update(?, ?, ?)";

  const [result] = await pool.execute(queryString, [
    classId,
    ClassName,
    ModifiedBy,
  ]);

  return result;
};

module.exports.findClassByName = async (className) => {
  const queryString = "CALL Proc_class_findClassByName(?)";
  const [[[result]]] = await pool.execute(queryString, [className]);
  return result;
};
