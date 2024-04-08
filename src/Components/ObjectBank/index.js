import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  getObjectByProject,
  deleteObject,
  saveObject,
} from "../../Redux/Actions/object";
import { connect } from "react-redux";
import ObjectList from "./ObjectList";
import ObjectTabs from "./ObjectTabs";

const ObjectBank = ({
  objectList,
  loading,
  getObjectByProject,
  deleteObject,
  saveObject,
}) => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ObjectList
              data={objectList}
              loading={loading}
              onDelete={deleteObject}
              onSave={saveObject}
              getList={getObjectByProject}
            />
          }
        />
        <Route path="/:objectId/:tab" element={<ObjectTabs />} />
      </Routes>
    </>
  );
};

const mapStateToProps = (state) => ({
  objectList: state.objectBank.data,
  loading: state.objectBank.loading,
});
const mapDispatchToProps = {
  getObjectByProject,
  deleteObject,
  saveObject,
};

export default connect(mapStateToProps, mapDispatchToProps)(ObjectBank);
