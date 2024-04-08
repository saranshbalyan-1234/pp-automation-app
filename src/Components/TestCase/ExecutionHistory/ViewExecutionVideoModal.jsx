import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { connect } from "react-redux";
import Loading from "../../Common/Loading";
import axios from "axios";
import { PlayCircleFilled, PauseCircleFilled } from "@ant-design/icons";
const ViewExecutionVideoModal = ({
  currentExecutionHistory,
  visible,
  setVisible,
}) => {
  const interval = 1000;
  const [loading, setLoading] = useState(true);
  const [currentScreenshot, setCurrentScreenshot] = useState("");
  const [nextScreenshot, setNextScreenshot] = useState("");
  const [currentPos, setCurrentPos] = useState({ i: 0, j: 2 });
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    const firstScreenshotId =
      currentExecutionHistory.process[0].testSteps[0].testStepId;
    const secondScreenshotId =
      currentExecutionHistory.process[0].testSteps[1]?.testStepId;
    fetchCurrentScreenShot(firstScreenshotId);
    secondScreenshotId && fetchNextScreenShot(secondScreenshotId);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!playing) return;
    handleNextScreenshot();
    //   eslint-disable-next-line
  }, [nextScreenshot, playing]);
  const handleNextScreenshot = async () => {
    setTimeout(async () => {
      if (
        currentPos.j <
        currentExecutionHistory.process[currentPos.i].testSteps.length
      ) {
        setCurrentPos({ ...currentPos, j: { ...currentPos }.j + 1 });
      } else if (currentPos.i < currentExecutionHistory.process.length - 1) {
        setCurrentPos({ ...currentPos, i: { ...currentPos }.i + 1, j: 0 });
      } else {
        nextScreenshot && setCurrentScreenshot(nextScreenshot);
      }
      nextScreenshot && setCurrentScreenshot(nextScreenshot);
      await fetchNextScreenShot(
        currentExecutionHistory.process[currentPos.i].testSteps[currentPos.j]
          .testStepId
      );
    }, interval);
  };
  const fetchCurrentScreenShot = async (stepId) => {
    setLoading(true);
    const { data } = await axios.post("/aws/object", {
      fileName: `${currentExecutionHistory.id}/${stepId}`,
    });
    setCurrentScreenshot(data);
    setLoading(false);
  };
  const fetchNextScreenShot = async (stepId) => {
    const { data } = await axios.post("/aws/object", {
      fileName: `${currentExecutionHistory.id}/${stepId}`,
    });

    setNextScreenshot(data);
  };

  return (
    <Modal
      width={1300}
      centered
      open={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <Loading loading={loading}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!loading && (
            <img
              alt="screenshot"
              src={"data:image/jpeg;base64," + currentScreenshot}
              style={{ maxWidth: "85vw" }}
            />
          )}
        </div>
        <div id="controls" className="row" style={{ fontSize: 20 }}>
          {playing ? (
            <PauseCircleFilled
              onClick={() => {
                setPlaying(false);
              }}
            />
          ) : (
            <PlayCircleFilled
              onClick={() => {
                setPlaying(true);
              }}
            />
          )}
        </div>
      </Loading>
    </Modal>
  );
};
const mapStateToProps = (state) => ({
  currentExecutionHistory: state.executionHistory.currentExecutionHistory,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewExecutionVideoModal);
