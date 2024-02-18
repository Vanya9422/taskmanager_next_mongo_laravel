// App.js
import 'tailwindcss/tailwind.css';
import TaskList from '@~components/Tasks/TaskList';
import CreateTaskForm from "@~components/Tasks/CreateTaskForm";

const App = () => {
    return (
        <div>
            <CreateTaskForm />
            <TaskList />
        </div>
    );
};

export default App;
