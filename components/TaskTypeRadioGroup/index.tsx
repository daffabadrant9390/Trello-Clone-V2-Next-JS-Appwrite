'use client';

import { useBoardStore } from '@/store/BoardStore';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';

type TaskTypeRadioGroupDataItem = {
  id: ColumnType;
  name: string;
  description: string;
  color: string;
};

const taskTypeRadioGroupData: TaskTypeRadioGroupDataItem[] = [
  {
    id: 'todo',
    name: 'To Do',
    description: 'A new task to be completed',
    color: 'bg-red-500',
  },
  {
    id: 'inprogress',
    name: 'In Progress',
    description: 'A task that is currently being worked on',
    color: 'bg-yellow-500',
  },
  {
    id: 'done',
    name: 'Done',
    description: 'A task that has been completed',
    color: 'bg-green-500',
  },
];

const TaskTypeRadioGroup = () => {
  const [newTaskType, setNewTaskType] = useBoardStore((state) => [
    state.newTaskType,
    state.setNewTaskType,
  ]);

  return (
    <div className="w-full py-5">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={newTaskType} onChange={(e) => setNewTaskType(e)}>
          <div className="space-y-2">
            {taskTypeRadioGroupData.map((taskTypeDataItem) => (
              <RadioGroup.Option
                key={taskTypeDataItem.id}
                value={taskTypeDataItem.id}
                className={({ active, checked }) =>
                  `
                    ${
                      !!active
                        ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                        : ''
                    }
                    ${
                      !!checked
                        ? `${taskTypeDataItem.color} bg-opacity-75 text-white`
                        : 'bg-white'
                    }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none
                  `
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="w-full flex flex-row items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex flex-col gap-1 text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium ${
                              !!checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {taskTypeDataItem.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              !!checked ? 'text-white' : 'text-gray-500'
                            }`}
                          >
                            <span>{taskTypeDataItem.description}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {!!checked && (
                        <div className="relative flex-shrink-0 text-white">
                          <CheckCircleIcon className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default TaskTypeRadioGroup;
