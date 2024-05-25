import PropTypes from "prop-types";
import { memo } from "react";

const KanbanItem = ({ item, STATUS_ITEMS, setChangesStatus}) => {
  const time = item.createdAt.split("T")[1].slice(0, 5);



  return (
    <div className="kanban__item">
      <div className="kanban__status">
        <p>{item.title}</p>
        {/* <button onClick={onDelete}>Delete</button> */}
      </div>
      <p className="kanban__commit">{item.desc}</p>
      <div className="kanban__status">
        <select
          onChange={(e) =>
            setChangesStatus({ ...item, status: e.target.value })
          }
          value={item.status}
        >
          {STATUS_ITEMS.map((statusItem) => (
            <option key={statusItem.id} value={statusItem.status}>
              {statusItem.status}
            </option>
          ))}
        </select>
        <span>{time}</span>
      </div>
    </div>
  );
};

KanbanItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  STATUS_ITEMS: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  setChangesStatus: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default memo(KanbanItem);
