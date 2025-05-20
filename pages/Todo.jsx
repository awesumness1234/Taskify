import React, { useEffect, useState } from 'react';
import Navbar1 from '../components/Navbar1';
import { Button, Divider, Empty, Input, Modal, Select, Tag, Tooltip, message } from 'antd';
import { getErrorMessage } from '../util/GetError';
import { getUserDetails } from '../util/GetUser';
import ToDoServices from '../services/toDoServices';
import { useNavigate } from 'react-router';
import { CheckCircleFilled, CheckCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

function Todo() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allToDo, setAllToDo] = useState([]);
  const [currentEditItem, setCurrentEditItem] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedStatus, setUpdatedStatus] = useState('');
  const [currentTaskType, setCurrentTaskType] = useState('incomplete');
  const [completedTodo, setCompletedTodo] = useState([]);
  const [incompletedTodo, setIncompletedTodo] = useState([]);
  const [currentTodoTask, setCurrentToDoTask] = useState([]);
  const [searchText, setSearchText] = useState('');

  const navigate = useNavigate();

  const getAllToDo = async () => {
    try {
      const user = getUserDetails();
      const response = await ToDoServices.getAllToDo(user?.userId);
      setAllToDo(response.data);
    } catch (err) {
      message.error(getErrorMessage(err));
    }
  };

  useEffect(() => {
    const user = getUserDetails();
    if (user && user?.userId) {
      getAllToDo();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const incomplete = allToDo.filter((item) => item.isCompleted === false);
    const complete = allToDo.filter((item) => item.isCompleted === true);
    setIncompletedTodo(incomplete);
    setCompletedTodo(complete);
    
    // Set current task list based on selected type
    if (currentTaskType === 'incomplete') {
      setCurrentToDoTask(incomplete);
    } else {
      setCurrentToDoTask(complete);
    }
  }, [allToDo, currentTaskType]);

  const handleSubmitTask = async () => {
    setLoading(true);
    try {
      const userId = getUserDetails()?.userId;
      const data = {
        title,
        description,
        isCompleted: false,
        createdBy: userId,
      };
      await ToDoServices.createToDo(data);
      message.success('To Do Task Added Successfully!');
      setIsAdding(false);
      setTitle('');
      setDescription('');
      getAllToDo();
    } catch (err) {
      message.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const getFormattedDate = (value) => {
    const date = new Date(value);
    const dateString = date.toDateString();
    const hh = date.getHours().toString().padStart(2, '0');
    const min = date.getMinutes().toString().padStart(2, '0');
    const ss = date.getSeconds().toString().padStart(2, '0');
    return `${dateString} at ${hh}:${min}:${ss}`;
  };

  const handleEdit = (item) => {
    setCurrentEditItem(item);
    setUpdatedTitle(item?.title);
    setUpdatedDescription(item?.description);
    setUpdatedStatus(item?.isCompleted);
    setIsEditing(true);
  };

  const handleDelete = async (item) => {
    try {
      await ToDoServices.deleteToDo(item._id);
      message.success(`${item.title} is Deleted Successfully!`);
      getAllToDo();
    } catch (err) {
      message.error(getErrorMessage(err));
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await ToDoServices.updateToDo(id, { isCompleted: status });
      message.success('Task Status Updated Successfully!');
      getAllToDo();
    } catch (err) {
      message.error(getErrorMessage(err));
    }
  };

  const handleUpdateTask = async () => {
    try {
      setLoading(true);
      const data = {
        title: updatedTitle,
        description: updatedDescription,
        isCompleted: updatedStatus,
      };
      await ToDoServices.updateToDo(currentEditItem?._id, data);
      message.success(`${currentEditItem?.title} Updated Successfully!`);
      setIsEditing(false);
      getAllToDo();
    } catch (err) {
      message.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (value) => {
    setCurrentTaskType(value);
    setSearchText(''); // Clear search when changing type
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchText(query);
  };

  // Filter tasks based on search text
  const getFilteredTasks = () => {
    if (!searchText || !searchText.trim()) {
      return currentTodoTask;
    }

    const trimmed = searchText.trim().toLowerCase();
    return currentTodoTask.filter((item) => {
      // Search in both title and description
      const titleMatch = item.title && item.title.toLowerCase().includes(trimmed);
      const descriptionMatch = item.description && item.description.toLowerCase().includes(trimmed);
      return titleMatch || descriptionMatch;
    });
  };

  const tasksToDisplay = getFilteredTasks();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar1 />
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-4xl font-bold text-gray-100">My Tasks</h2>
          <Input
            value={searchText}
            className="!h-10 !text-sm !py-2 !px-3 bg-gray-800 border-gray-700 text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            placeholder="Search tasks by title or description..."
            allowClear
            style={{ width: 300 }}
          />
          <div className="flex gap-2">
            <Button
              onClick={() => setIsAdding(true)}
              type="primary"
              size="large"
              className="bg-blue-500 hover:bg-blue-600"
            >
              Add Task
            </Button>
            <Select
              value={currentTaskType}
              style={{ width: 180 }}
              onChange={handleTypeChange}
              size="large"
              className="bg-gray-800 text-gray-100"
              options={[
                { value: 'incomplete', label: `Incomplete (${incompletedTodo.length})` },
                { value: 'complete', label: `Complete (${completedTodo.length})` },
              ]}
            />
          </div>
        </div>
        
        {/* Search results indicator */}
        {searchText && searchText.trim() && (
          <div className="mb-4">
            <span className="text-gray-400 text-sm">
              Found {tasksToDisplay.length} task(s) matching "{searchText}"
            </span>
          </div>
        )}
        
        <Divider className="border-gray-700" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasksToDisplay.length > 0 ? (
            tasksToDisplay.map((item) => (
              <div key={item?._id} className="bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-700">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-semibold text-gray-100">{item?.title}</h3>
                    {item?.isCompleted ? (
                      <Tag color="cyan" className="bg-cyan-900 text-cyan-200 border-cyan-700">
                        Completed
                      </Tag>
                    ) : (
                      <Tag color="red" className="bg-red-900 text-red-200 border-red-700">
                        Incomplete
                      </Tag>
                    )}
                  </div>
                  <p className="text-gray-300 mb-4">{item?.description}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <Tag className="bg-gray-700 text-gray-300 border-gray-600 self-start">
                    {getFormattedDate(item?.createdAt)}
                  </Tag>
                  <div className="flex justify-end gap-3 mt-2">
                    <Tooltip title="Edit Task?">
                      <EditOutlined
                        onClick={() => handleEdit(item)}
                        className="text-blue-400 hover:text-blue-300 text-lg cursor-pointer"
                      />
                    </Tooltip>
                    <Tooltip title="Delete Task?">
                      <DeleteOutlined
                        onClick={() => handleDelete(item)}
                        className="text-red-400 hover:text-red-300 text-lg cursor-pointer"
                      />
                    </Tooltip>
                    {item?.isCompleted ? (
                      <Tooltip title="Mark as Incomplete">
                        <CheckCircleFilled
                          onClick={() => handleUpdateStatus(item._id, false)}
                          className="text-green-400 hover:text-green-300 text-lg cursor-pointer"
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Mark as Completed">
                        <CheckCircleOutlined
                          onClick={() => handleUpdateStatus(item._id, true)}
                          className="text-gray-400 hover:text-gray-300 text-lg cursor-pointer"
                        />
                      </Tooltip>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center p-10">
              <Empty 
                description={
                  <span className="text-gray-400">
                    {searchText && searchText.trim() 
                      ? `No tasks found matching "${searchText}"` 
                      : "No tasks found"
                    }
                  </span>
                } 
              />
            </div>
          )}
        </div>

        <Modal
          confirmLoading={loading}
          title={<span className="text-gray-800">Add New Task</span>}
          open={isAdding}
          onOk={handleSubmitTask}
          onCancel={() => setIsAdding(false)}
          okButtonProps={{ className: 'bg-blue-600 hover:bg-blue-700' }}
          cancelButtonProps={{ className: 'bg-gray-600 hover:bg-gray-700 text-white' }}
        >
          <div className="space-y-4">
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
        </Modal>

        <Modal
          confirmLoading={loading}
          title={<span className="text-gray-800">Update {currentEditItem.title}</span>}
          open={isEditing}
          onOk={handleUpdateTask}
          onCancel={() => setIsEditing(false)}
          okButtonProps={{ className: 'bg-blue-600 hover:bg-blue-700' }}
          cancelButtonProps={{ className: 'bg-gray-600 hover:bg-gray-700 text-white' }}
        >
          <Input
            className="mb-4 bg-gray-100 border-gray-300 text-gray-800 rounded-md"
            placeholder="Updated Title"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <Input.TextArea
            className="mb-4 bg-gray-100 border-gray-300 text-gray-800 rounded-md"
            placeholder="Updated Description"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          <Select
            onChange={(value) => setUpdatedStatus(value)}
            value={updatedStatus}
            className="w-full bg-gray-100 text-gray-800 rounded-md"
            options={[
              {
                value: false,
                label: 'Not Completed',
              },
              {
                value: true,
                label: 'Completed',
              },
            ]}
          />
        </Modal>
      </section>
    </div>
  );
}

export default Todo;