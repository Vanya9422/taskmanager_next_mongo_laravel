// TaskTable.js
import TaskRow from "@~components/Tasks/TaskRow"; // Убедитесь, что путь импорта корректен

const TaskTable = ({ tasks }) => (
    <table className="table-auto w-full">
        <thead>
        <tr>
            <th className="px-4 py-2">Имя пользователя</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Текст задачи</th>
            <th className="px-4 py-2">Статус</th>
            <th className="px-4 py-2">Редактировано администратором</th>
            <th className="px-4 py-2">Создано</th>
            <th className="px-4 py-2">Обновлено</th>
        </tr>
        </thead>
        <tbody>
        {tasks.map(task => <TaskRow key={task.id} task={task} />)}
        </tbody>
    </table>
);

export default TaskTable;
