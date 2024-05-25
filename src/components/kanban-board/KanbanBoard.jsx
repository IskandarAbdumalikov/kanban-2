import { useCallback, useEffect, useRef, useState } from "react";

import KanbanBlock from "./KanbanBlock";
import KanbanItem from "./KanbanItem";
import { DATA } from "@/static";

const KanbanBoard = () => {
  const initialStatusItems =
    JSON.parse(localStorage.getItem("kanban-statuses")) || [];

  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("kanban-data")) || DATA
  );
  const [statusItems, setStatusItems] = useState(initialStatusItems);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [changesStatus, setChangesStatus] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [isAddingStatus, setIsAddingStatus] = useState(false);
  const [error, setError] = useState("");

  const titleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("kanban-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("kanban-statuses", JSON.stringify(statusItems));
  }, [statusItems]);

  useEffect(() => {
    if (changesStatus) {
      const updatedData = data.map((item) =>
        item.id === changesStatus.id ? changesStatus : item
      );
      setData(updatedData);
      setChangesStatus(null);
    }
  }, [changesStatus, data]);
  console.log(statusItems.length);

  const filterByStatus = useCallback(
    (status) => {
      return data
        .filter((item) => item.status === status)
        .map((item) => (
          <KanbanItem
            key={item.id}
            setChangesStatus={setChangesStatus}
            item={item}
            STATUS_ITEMS={statusItems}
            handleDelete={handleDelete}
          />
        ));
    },
    [data, statusItems]
  );

  const handleCreateItem = (e) => {
    e.preventDefault();
    const newDate = new Date();
    const newItem = {
      id: newDate.getTime(),
      title: titleRef.current.value,
      desc: descRef.current.value,
      status: selectedStatus,
      createdAt: newDate.toISOString(),
    };
    setData((prev) => [...prev, newItem]);
    setSelectedStatus(null);
    titleRef.current.value = "";
    descRef.current.value = "";
  };

  const handleAddKanban = () => {
    setIsAddingStatus(true);
  };

  const handleSaveStatus = () => {
    if (statusItems.length >= 4) {
      alert(
        "Siz maximum 4 ta status yarat olasiz ,Ko`proq hohlasangiz premiumni oling"
      );
      return;
    }
    if (
      statusItems.find(
        (item) => item.status.toLowerCase() === newStatus.toLowerCase()
      )
    ) {
      setError("This status already exists");
    } else {
      const newStatusItem = {
        id: new Date().getTime(),
        status: newStatus,
      };
      setStatusItems((prev) => [...prev, newStatusItem]);
      setIsAddingStatus(false);
      setNewStatus("");
      setError("");
    }
  };

  const handleDelete = (statusId) => {
    if (confirm("Are you sure")) {
      const updatedStatusItems = statusItems.filter(
        (item) => item.id !== statusId
      );

      setStatusItems(updatedStatusItems);
    }
  };
  const handleCloseOverlay = () => {
    setSelectedStatus(null);
    setIsAddingStatus(false);
  };

  return (
    <section>
      <div className="container">
        <div className="kanban">
          <h2 className="kanban__title">Kanban Board</h2>
          <div className="kanban__header">
            <button className="kanban__btn" onClick={handleAddKanban}>
              Add
            </button>
          </div>

          <form
            className={
              isAddingStatus
                ? "kanban__add-status show-status"
                : "kanban__add-status"
            }
          >
            <input
              type="text"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              placeholder="Enter new status"
            />
            <div className="kanban__add-status__btns">
              <button className="save__btn" onClick={handleSaveStatus}>
                Save
              </button>
              <button className="cancel__btn" onClick={handleCloseOverlay}>
                Cancel
              </button>
            </div>
            {error && <p className="error">{error}</p>}
          </form>

          {selectedStatus || isAddingStatus ? (
            <div onClick={handleCloseOverlay} className="overlay"></div>
          ) : (
            <></>
          )}
          <form
            onSubmit={handleCreateItem}
            className={`kanban__form ${selectedStatus ? "show" : ""}`}
          >
            <p>Create something</p>
            <input required ref={titleRef} type="text" placeholder="Title" />
            <input
              required
              ref={descRef}
              type="text"
              placeholder="Description"
            />
            <button type="submit" className="create__btn">
              Create
            </button>
            <button
              className="cancel__btn"
              type="button"
              onClick={() => setSelectedStatus(null)}
            >
              Cancel
            </button>
          </form>
          <div
            className={
              statusItems.length === 0
                ? "kanban__wrapper   flex__kanban"
                : "kanban__wrapper"
            }
          >
            {statusItems.length > 0 ? (
              statusItems.map((statusItem) => (
                <KanbanBlock
                  key={statusItem.id}
                  statusItem={statusItem}
                  items={filterByStatus}
                  setSelectedStatus={setSelectedStatus}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <div className="empty__desk">
                <h1>Ishingizni tartibga soling</h1>
                <button onClick={handleAddKanban}>Get started</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KanbanBoard;
