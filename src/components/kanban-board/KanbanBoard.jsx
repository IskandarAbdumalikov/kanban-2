import { useCallback, useEffect, useRef, useState } from "react";
import { DATA } from "@/static";
import KanbanBlock from "./KanbanBlock";
import KanbanItem from "./KanbanItem";

const STATUS_ITEMS = ["ready", "working", "stuck", "done"];

const KanbanBoard = () => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("karban-data")) || DATA
  );
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [changesStatus, setChangesStatus] = useState(null);

  const title = useRef(null);
  const desc = useRef(null);

  useEffect(() => {
    localStorage.setItem("karban-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (changesStatus) {
      let index = data?.findIndex((el) => el.id === changesStatus.id);
      data?.splice(index, 1, changesStatus);
      setData([...data]);
    }
  }, [changesStatus]);

  const filterByStatus = (status) => {
    return data
      ?.filter((el) => el.status === status)
      ?.map((el) => (
        <KanbanItem
          setChangesStatus={setChangesStatus}
          el={el}
          STATUS_ITEMS={STATUS_ITEMS}
          key={el.id}
        />
      ));
  };

  let memoFilterByStatus = useCallback(
    (status) => {
      return filterByStatus(status);
    },
    [data]
  );

  const handleCreateItem = (e) => {
    e.preventDefault();
    let date = new Date();
    let timeZoneGMT = (hour) =>
      new Date(date.getTime() + hour * 60 * 60 * 1000);
    let newItems = {
      id: date,
      title: title.current.value,
      desc: desc.current.value,
      status: selectedStatus,
      createdAt: timeZoneGMT(5).toISOString(),
    };
    setData((prev) => [...prev, newItems]);
    console.log(
      "newItems>>",
      newItems,
      "timeZone>>",
      timeZoneGMT(5).toISOString
    );

    setSelectedStatus(null);
    title.current.value = "";
    desc.current.value = "";
  };

  return (
    <section>
      <div className="container">
        <div className="kanban">
          <h2 className="kanban__title">Kanban Board</h2>
          <div className="kanban__header">
            <button className="kanban__btn">Add</button>
          </div>
          <form
            onSubmit={handleCreateItem}
            className={`kanban__form ${selectedStatus ? "show" : ""}`}
          >
            <p>Create something</p>
            <input required ref={title} type="text" />
            <input required ref={desc} type="text" />
            <button>Create</button>
            <button type="button" onClick={() => setSelectedStatus(null)}>
              Cancel
            </button>
          </form>
          <div className="kanban__wrapper">
            <KanbanBlock
              STATUS_ITEMS={STATUS_ITEMS}
              items={memoFilterByStatus}
              setSelectedStatus={setSelectedStatus}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default KanbanBoard;
