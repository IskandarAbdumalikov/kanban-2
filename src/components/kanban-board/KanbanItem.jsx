import PropTypes from "prop-types";
import { memo } from "react";

const KanbanItem = ({ el, STATUS_ITEMS, setChangesStatus }) => {
  let time = el.createdAt.split("T")[1].slice(0, 5);
  return (
    <div className="kanban__item">
      <p>{el.title}</p>
      <p className="kanban__commit">{el.desc}</p>
      <div className="kanban__status">
        <select
          onChange={(e) => setChangesStatus({ ...el, status: e.target.value })}
          name=""
          id=""
          value={el.status}
        >
          {STATUS_ITEMS?.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
        <span>{time}</span>
      </div>
    </div>
  );
};

export default memo(KanbanItem);

KanbanItem.propTypes = {
  el: PropTypes.object,
  STATUS_ITEMS: PropTypes.array,
  setChangesStatus: PropTypes.func,
};
