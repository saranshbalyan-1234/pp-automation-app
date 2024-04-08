import React, { useEffect, useState } from "react";
import { Modal, Form, Select, Button, Alert } from "antd";
import { connect } from "react-redux";
import {
  getAllMachines,
  checkChromedriverCompatibility,
} from "../../../Redux/Actions/machines";
import Loading from "../../Common/Loading";
function CheckChromdriverCompatibilityModal({
  visible,
  setVisible,
  machines,
  machinesLoading,
  checkChromedriverCompatibility,
  getAllMachines,
}) {
  const [version, setVersion] = useState({
    chromeVersion: null,
    chromeDriverVersion: null,
  });
  const [form] = Form.useForm();

  useEffect(() => {
    machines.length === 0 && getAllMachines();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    machines.length > 0 &&
      form.setFieldsValue({
        machine: machines[0].url,
      });
    // eslint-disable-next-line
  }, [machines]);

  const handleCheckChromdriverCompatibility = async (data) => {
    const result = await checkChromedriverCompatibility(
      data.machine || process.env.REACT_APP_DEFAULT_MACHINE
    );
    setVersion(result);
  };

  return (
    <Modal
      title="Check Chromerdriver Compaitility!"
      centered
      open={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <div style={{ marginBottom: 20 }}>
        {" "}
        Note: This can check compaitility only if Chrome Version &gt;= 73
      </div>

      <div style={{ marginBottom: 20 }}>
        {" "}
        <Alert
          message={version?.compatible ? "Compatible" : "Not Compatible"}
          description={
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div>Chrome Version: {version?.chromeVersion}</div>
              <div>Chrome Driver Version: {version?.chromeDriverVersion}</div>
            </div>
          }
          type={version?.compatible ? "success" : "error"}
          showIcon
        />
      </div>

      <Loading loading={machinesLoading}>
        <Form
          form={form}
          name="Check Chromdriver Compatibility"
          onFinish={handleCheckChromdriverCompatibility}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {machines.length > 0 && (
            <Form.Item
              name="machine"
              label="Machine"
              rules={[
                {
                  required: true,
                  message: "Please Select Machine!",
                },
              ]}
            >
              <Select
                showSearch
                style={{ minWidth: "160px" }}
                optionFilterProp="children"
              >
                {machines.map((el, i) => {
                  return (
                    <Select.Option value={el.url} key={i}>
                      {el.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="primary"
              style={{ marginRight: "20px" }}
              htmlType="submit"
            >
              Submit
            </Button>
            <Button
              style={{ marginRight: "20px" }}
              onClick={() => {
                setVisible(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Loading>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  machines: state.machines.data,
  machinesLoading: state.machines.loading,
});
const mapDispatchToProps = { getAllMachines, checkChromedriverCompatibility };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckChromdriverCompatibilityModal);
