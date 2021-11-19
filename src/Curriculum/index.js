import React, { useContext, useState } from "react";
import "./index.scss";
import RightArrow from "./svg/right-arrow.svg";
import LeftArrow from "./svg/left-arrow.svg";
import Move from "./svg/move.svg";
import Trash from "./svg/trash.svg";
import { MyContext } from "../appContext";

export default function Index() {
  const [currentIndent, setCurrentIndent] = useState("CHAPTER");
  const [newStandard, setNewStandard] = useState("");
  const getConsumer = useContext(MyContext);
  const { subject, children, childrenAllIdsOrder } = getConsumer.state;
  const { triggerDragDrop } = getConsumer;
  const [dragOverIds, setDragOverIds] = useState([]);
  const [dragStartIds, setDragStartIds] = useState([]);
  const chapter = children;
  const chapterAllIds = childrenAllIdsOrder;

  const changeOutdentInput = () => {
    if (currentIndent === "SUBHEADING") setCurrentIndent("HEADING");
    else if (currentIndent === "HEADING") setCurrentIndent("CHAPTER");
  };
  const changeIndentInput = () => {
    if (currentIndent === "CHAPTER") setCurrentIndent("HEADING");
    else if (currentIndent === "HEADING") setCurrentIndent("SUBHEADING");
  };

  const handleDragOverIds = (ids) => {
    setDragOverIds([...ids]);
  };
  const handleDragDropStartIds = (ids) => {
    setDragStartIds([...ids]);
  };
  const dragDropEndHandler = () => {
    if (dragOverIds.length !== dragStartIds.length) {
      alert(
        "Parent element cannot be a chilren E.g Chapter cannot be Heading or Subheading."
      );
    } else {
      triggerDragDrop(dragStartIds, dragOverIds);
    }
  };
  const {
    handleIndent,
    handleOutdent,
    HandleChangeStandard,
    trashStandard,
    addStandard,
  } = getConsumer;

  const setMarginLeft = (standardType) => {
    const UNITS = "em";
    if (standardType === "CHAPTER") return 0 + UNITS;
    else if (standardType === "HEADING") return 1 + UNITS;
    else if (standardType === "SUBHEADING") return 2 + UNITS;

    return "";
  };

  const handleStandardSummit = (event) => {
    event.preventDefault();
    addStandard(currentIndent, newStandard);
    setNewStandard("");
  };
  return (
    <div className="curriculum-wrapper">
      <div className="subject-heading">
        <b>{subject}</b>
      </div>
      <div className="subjects-wrapper">
        <div className="subjects-heading">
          <div className="heading-wrapper">
            <div className="main-heading">Actions</div>
            <div className="sub-heading">Move, Indent, Outdent, Delete</div>
          </div>
          <div className="heading-wrapper">
            <div className="main-heading">Standard</div>
            <div className="sub-heading">The text of the standard</div>
          </div>
        </div>
        <div className="subject-body">
          {chapterAllIds.map((chapterId) => {
            const { name } = chapter[chapterId];
            const heading = chapter[chapterId].children;
            const headingAllIds = chapter[chapterId].childrenAllIdsOrder;
            return (
              <div className="subject-box" key={chapterId}>
                <div className="subject-row">
                  <div
                    className="subject-col"
                    onDragOver={() => {
                      handleDragOverIds([chapterId]);
                    }}
                  >
                    <div className="tooltip-wrapper">
                      <img
                        className="cursor-pointer" 
                        src={Move}
                        alt="move"
                        onDragStart={() => {
                          handleDragDropStartIds([chapterId]);
                        }}
                        onDragEnd={() => {
                          dragDropEndHandler();
                        }}
                      />
                      <span className="tooltiptext">Move</span>
                    </div>{" "}
                    <div className="tooltip-wrapper">
                      <img
                        className="cursor-pointer"
                        src={LeftArrow}
                        alt="left indent"
                        onClick={() => {
                          handleOutdent(chapterId);
                        }}
                      />
                      <span className="tooltiptext">Outdent</span>
                    </div>{" "}
                    <div className="tooltip-wrapper">
                      <img
                        className="cursor-pointer"
                        src={RightArrow}
                        alt="right indent"
                        onClick={() => {
                          handleIndent(chapterId);
                        }}
                      />{" "}
                      <span className="tooltiptext">Indent</span>
                    </div>
                    <div className="tooltip-wrapper">
                      <img
                        className="cursor-pointer"
                        src={Trash}
                        alt="dustbin"
                        onClick={() => {
                          trashStandard(chapterId);
                          setCurrentIndent("CHAPTER");
                        }}
                      />
                      <span className="tooltiptext">Delete</span>
                    </div>
                  </div>
                  <div className="subject-col">
                    <div
                      className="level"
                      style={{ marginLeft: `${setMarginLeft("CHAPTER")}` }}
                    />
                  </div>
                  <div className="subject-col">
                    <input
                      className="chapter"
                      type="text"
                      value={name}
                      onChange={(event) =>
                        HandleChangeStandard(event, chapterId)
                      }
                    />
                  </div>
                </div>
                <div className="heading-box">
                  {headingAllIds.map((headingId) => {
                    const { name } = heading[headingId];
                    const subHeadingAllIds =
                      heading[headingId].childrenAllIdsOrder;
                    const subHeading = heading[headingId].children;
                    return (
                      <React.Fragment key={headingId}>
                        <div className="heading-row" key={headingId}>
                          <div
                            className="heading-col"
                            onDragOver={() => {
                              handleDragOverIds([chapterId, headingId]);
                            }}
                          >
                            <div className="tooltip-wrapper">
                              <img
                                className="cursor-pointer"
                                src={Move}
                                alt="move"
                                onDragStart={() => {
                                  handleDragDropStartIds([
                                    chapterId,
                                    headingId,
                                  ]);
                                }}
                                onDragEnd={() => {
                                  dragDropEndHandler();
                                }}
                              />{" "}
                              <span className="tooltiptext">Move</span>
                            </div>

                            <div className="tooltip-wrapper">
                              <img
                                className="cursor-pointer"
                                src={LeftArrow}
                                alt="left arrow"
                                onClick={() => {
                                  handleOutdent(chapterId, headingId);
                                }}
                              />{" "}
                              <span className="tooltiptext">Outdent</span>
                            </div>
                            <div className="tooltip-wrapper">
                              <img
                                className="cursor-pointer"
                                src={RightArrow}
                                alt="right arrow"
                                onClick={() => {
                                  handleIndent(chapterId, headingId);
                                }}
                              />{" "}
                              <span className="tooltiptext">Indent</span>
                            </div>
                            <div className="tooltip-wrapper">
                              <img
                                className="cursor-pointer"
                                src={Trash}
                                alt="dustbin"
                                onClick={() => {
                                  trashStandard(chapterId, headingId);
                                  setCurrentIndent("HEADING");
                                }}
                              />
                              <span className="tooltiptext">Delete</span>
                            </div>
                          </div>
                          <div className="heading-col">
                            <div
                              className="level"
                              style={{
                                marginLeft: `${setMarginLeft("HEADING")}`,
                              }}
                            />
                          </div>
                          <div className="heading-col">
                            <input
                              className="heading"
                              type="text"
                              value={name}
                              onChange={(event) =>
                                HandleChangeStandard(
                                  event,
                                  chapterId,
                                  headingId
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="sub-heading-box">
                          {subHeadingAllIds &&
                            subHeadingAllIds.map((subHeadingId) => {
                              const { name } = subHeading[subHeadingId];
                              return (
                                <div
                                  className="sub-heading-row"
                                  key={subHeadingId}
                                >
                                  <div
                                    className="sub-heading-col"
                                    onDragOver={() => {
                                      handleDragOverIds([
                                        chapterId,
                                        headingId,
                                        subHeadingId,
                                      ]);
                                    }}
                                  >
                                    <div className="tooltip-wrapper">
                                      <img
                                        className="cursor-pointer"
                                        src={Move}
                                        alt="move"
                                        onDragStart={() => {
                                          handleDragDropStartIds([
                                            chapterId,
                                            headingId,
                                            subHeadingId,
                                          ]);
                                        }}
                                        onDragEnd={() => {
                                          dragDropEndHandler();
                                        }}
                                      />{" "}
                                      <span className="tooltiptext">Move</span>
                                    </div>
                                    <div className="tooltip-wrapper">
                                      <img
                                        className="cursor-pointer"
                                        src={LeftArrow}
                                        alt="left arrow"
                                        onClick={() => {
                                          handleOutdent(
                                            chapterId,
                                            headingId,
                                            subHeadingId
                                          );
                                        }}
                                      />{" "}
                                      <span className="tooltiptext">
                                        Outdent
                                      </span>
                                    </div>
                                    <div className="tooltip-wrapper">
                                      <img
                                        className="cursor-pointer"
                                        src={RightArrow}
                                        alt="right arrow"
                                        onClick={() =>
                                          handleIndent(
                                            chapterId,
                                            headingId,
                                            subHeadingId
                                          )
                                        }
                                      />{" "}
                                      <span className="tooltiptext">
                                        Indent
                                      </span>
                                    </div>
                                    <div className="tooltip-wrapper">
                                      <img
                                        className="cursor-pointer"
                                        src={Trash}
                                        alt="dustbin"
                                        onClick={() => {
                                          trashStandard(
                                            chapterId,
                                            headingId,
                                            subHeadingId
                                          );
                                          setCurrentIndent("SUBHEADING");
                                        }}
                                      />
                                      <span className="tooltiptext">
                                        Delete
                                      </span>
                                    </div>
                                  </div>
                                  <div className="sub-heading-col">
                                    <div
                                      className="level"
                                      style={{
                                        marginLeft: `${setMarginLeft(
                                          "SUBHEADING"
                                        )}`,
                                      }}
                                    />
                                  </div>
                                  <div className="sub-heading-col">
                                    <input
                                      className="sub-heading"
                                      type="text"
                                      value={name}
                                      onChange={(event) =>
                                        HandleChangeStandard(
                                          event,
                                          chapterId,
                                          headingId,
                                          subHeadingId
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="enter-standard">
        <form onSubmit={handleStandardSummit}>
          <div className="standard-row">
            <div className="standard-col">
              <div className="tooltip-wrapper">
                <img className="cursor-pointer" src={Move} alt="move" />
                <span className="tooltiptext">Move</span>
              </div>{" "}
              <div className="tooltip-wrapper">
                <img
                  className="cursor-pointer"
                  src={LeftArrow}
                  alt="left arrow"
                  onClick={() => changeOutdentInput()}
                />{" "}
                <span className="tooltiptext">Outdent</span>
              </div>{" "}
              <div className="tooltip-wrapper">
                <img
                  className="cursor-pointer"
                  src={RightArrow}
                  alt="right arrow"
                  onClick={() => changeIndentInput()}
                />{" "}
                <span className="tooltiptext">Indent</span>
              </div>{" "}
              <div className="tooltip-wrapper">
                <img
                  className="cursor-pointer"
                  src={Trash}
                  alt="dustbin"
                  onClick={() => trashStandard()}
                />
                <span className="tooltiptext">Delete</span>
              </div>{" "}
            </div>
            <div className="standard-col">
              <div
                className="level"
                style={{ marginLeft: `${setMarginLeft(currentIndent)}` }}
              />
            </div>
            <div className="standard-col">
              <input
                className={
                  currentIndent === "CHAPTER"
                    ? "chapter"
                    : currentIndent === "HEADING"
                    ? "heading"
                    : "sub-heading"
                }
                type="text"
                placeholder="Type standard here (eg. Numbers ...)"
                required
                autoFocus
                value={newStandard}
                onChange={(e) => setNewStandard(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button type="submit" className="add-standard">
            &#10010; Add a standard 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
