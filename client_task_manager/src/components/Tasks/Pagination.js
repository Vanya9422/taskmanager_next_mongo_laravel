// Pagination.js
const Pagination = ({ onPreviousClick, onNextClick, canGoBack, canGoForward }) => (
    <div className="flex justify-between mt-4">
        <button onClick={onPreviousClick} disabled={!canGoBack}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50">
            Назад
        </button>
        <button onClick={onNextClick} disabled={!canGoForward}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            Вперёд
        </button>
    </div>
);

export default Pagination;
