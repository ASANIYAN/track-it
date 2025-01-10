import MultiList from "./multi-list";

const List = () => {
  const initialLists = [
    {
      id: "list-1",
      heading: "In Progress",
      items: [
        {
          task: "Customer Experience Insight Analysis",
          due: "Tuesday",
          id: "task-1",
          listId: "list-1",
        },
        {
          task: "Q1 Sales Report Review",
          due: "Wednesday",
          id: "task-2",
          listId: "list-1",
        },
        {
          task: "User Interface Redesign",
          due: "Friday",
          id: "task-3",
          listId: "list-1",
        },
        {
          task: "Team Performance Evaluation",
          due: "Next Monday",
          id: "task-4",
          listId: "list-1",
        },
      ],
    },
    {
      id: "list-2",
      heading: "To Do",
      items: [
        {
          task: "Update Documentation",
          due: "Thursday",
          id: "task-5",
          listId: "list-2",
        },
        {
          task: "Client Meeting Preparation",
          due: "Wednesday",
          id: "task-6",
          listId: "list-2",
        },
        {
          task: "Budget Planning 2025",
          due: "Next Week",
          id: "task-7",
          listId: "list-2",
        },
      ],
    },
    {
      id: "list-3",
      heading: "Completed",
      items: [
        {
          task: "Project Kickoff Meeting",
          due: "Done",
          id: "task-8",
          listId: "list-3",
        },
        {
          task: "Requirements Gathering",
          due: "Done",
          id: "task-9",
          listId: "list-3",
        },
      ],
    },
  ];
  return <MultiList initialLists={initialLists} />;
};

export default List;
