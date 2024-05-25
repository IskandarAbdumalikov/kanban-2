import PropTypes from "prop-types";
import { memo } from "react";

const KanbanBlock = ({
  statusItem,
  items,
  setSelectedStatus,
  handleDelete,
}) => {
  const filteredItems = items(statusItem.status);

  return (
    <div className="kanban__box">
      <div className="kanban__heading">
        <p>
          {statusItem.status} to start / {filteredItems.length}
        </p>
      </div>
      <div className="kanban__block">
        {filteredItems.length ? (
          filteredItems
        ) : (
          <div className="empty__block">
            <h1>Empty</h1>
            <button onClick={() => handleDelete(statusItem.id)}>Delete</button>
          </div>
        )}
      </div>
      <button
        onClick={() => setSelectedStatus(statusItem.status)}
        className="kanban__add_btn"
      >
        Add item
      </button>
    </div>
  );
};

KanbanBlock.propTypes = {
  statusItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  items: PropTypes.func.isRequired,
  setSelectedStatus: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default memo(KanbanBlock);
