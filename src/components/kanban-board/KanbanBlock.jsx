import PropTypes from "prop-types";
import { memo } from "react";

const KanbanBlock = ({ setSelectedStatus, items, STATUS_ITEMS }) => {
  return STATUS_ITEMS?.map((el) => (
    <div key={el} className={`kanban__box ${el}`}>
      <div className="kanban__heading">
        <p>
          {el} to start / {items(el)?.length}
        </p>
      </div>
      <div className="kanban__block">
        {items(el)?.length ? items(el) : <h1>Empty</h1>}
      </div>
      <button onClick={() => setSelectedStatus(el)} className="kanban__add_btn">
        Add item
      </button>
    </div>
  ));
};

export default memo(KanbanBlock);
KanbanBlock.propTypes = {
  setSelectedStatus: PropTypes.func,
  items: PropTypes.func,
  status: PropTypes.string,
};
