import React, { useEffect, useState } from "react";
import "./homepage.css";
import { ReactComponent as Down } from "../assets/down.svg";
import { ReactComponent as Display } from "../assets/Display.svg";
import backlog from "../assets/Backlog.svg";
import done from "../assets/Done.svg";
import inprogress from "../assets/in-progress.svg";
import todo from "../assets/To-do.svg";
import cancelled from "../assets/Cancelled.svg";
import menu from "../assets/3 dot menu.svg";
import add from "../assets/add.svg";
import Card from "./Card";
import noPriority from "../assets/No-priority.svg";
import lowPriority from "../assets/Img - Low Priority.svg";
import mediumPriority from "../assets/Img - Medium Priority.svg";
import highPriority from "../assets/Img - High Priority.svg";
import urgentPriority from "../assets/SVG - Urgent Priority colour.svg";

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [grouping, setGrouping] = useState(
    localStorage.getItem("grouping") || "Status"
  );
  const [ordering, setOrdering] = useState(
    localStorage.getItem("ordering") || "Priority"
  );
  const [data, setData] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        if (!response.ok) {
          throw new Error("Error fetching the data");
        }
        const result = await response.json();
        setData(result);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [data]);

  useEffect(() => {
    localStorage.setItem("grouping", grouping);
  }, [grouping]);

  useEffect(() => {
    localStorage.setItem("ordering", ordering);
  }, [ordering]);

  const Status = [
    { id: 1, title: "Backlog", icon: backlog },
    { id: 2, title: "Todo", icon: todo },
    { id: 3, title: "In progress", icon: inprogress },
    { id: 4, title: "done", icon: done },
    { id: 5, title: "cancelled", icon: cancelled },
  ];

  const Priority = [
    { id: 0, title: "No priority", icon: noPriority },
    { id: 4, title: "Urgent", icon: urgentPriority },
    { id: 3, title: "High", icon: highPriority },
    { id: 2, title: "Medium", icon: mediumPriority },
    { id: 1, title: "Low", icon: lowPriority },
  ];

  const User = [
    { id: "usr-1", title: "Anoop Sharma" },
    { id: "usr-2", title: "Yogesh" },
    { id: "usr-3", title: "Shankar Kumar" },
    { id: "usr-4", title: "Ramesh" },
    { id: "usr-5", title: "Suresh" },
  ];

  return (
    <>
      <div className="header-container">
        <div className="header-content">
          <div className="display-content">
            <button onClick={toggleDropdown} className="btn">
              <Display />
              <span>Display</span>
              <Down />
            </button>

            {isOpen && (
              <div className="groups">
                <div className="grp-content">
                  <div className="title">Grouping</div>
                  <select
                    value={grouping}
                    onChange={(e) => setGrouping(e.target.value)}
                    className="select"
                  >
                    <option value="Status">Status</option>
                    <option value="Priority">Priority</option>
                    <option value="User">User</option>
                  </select>
                </div>

                <div className="grp-content">
                  <div className="title">Ordering</div>
                  <select
                    value={ordering}
                    onChange={(e) => setOrdering(e.target.value)}
                    className="select"
                  >
                    <option value="Priority">Priority</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="hero-container">
        {grouping === "Status"
          ? Status.map((status) => (
              <div className="group-content" id={status.id} key={status.id}>
                <div className="group-title">
                  <div className="heading">
                    <img src={status.icon} alt="" />
                    <span>{status.title}</span>
                  </div>
                  <div className="heading">
                    <img src={add} alt="" />
                    <img src={menu} alt="" />
                  </div>
                </div>
                {data?.tickets
                  .filter((ticket) => ticket.status === status.title)
                  .sort((a, b) =>
                    ordering === "Priority"
                      ? b.priority - a.priority
                      : a.title.localeCompare(b.title)
                  )
                  .map((ticket) => (
                    <Card
                      key={ticket.id}
                      title={ticket.id}
                      content={ticket.title}
                      priorityLevel={ticket.priority}
                    />
                  ))}
              </div>
            ))
          : grouping === "Priority"
          ? Priority.map((priority) => (
              <div className="group-content" id={priority.id} key={priority.id}>
                <div className="group-title">
                  <div className="heading">
                    <img src={priority.icon} alt="" />
                    <span>{priority.title}</span>
                  </div>
                  <div className="heading">
                    <img src={add} alt="" />
                    <img src={menu} alt="" />
                  </div>
                </div>
                {data?.tickets
                  .filter((ticket) => ticket.priority === priority.id)
                  .sort((a, b) =>
                    ordering === "Priority"
                      ? b.priority - a.priority
                      : ordering === "title"
                      ? a.title.localeCompare(b.title)
                      : 0
                  )
                  .map((ticket) => (
                    <Card
                      key={ticket.id}
                      title={ticket.id}
                      content={ticket.title}
                    />
                  ))}
              </div>
            ))
          : User.map((user) => (
              <div className="group-content" id={user.id} key={user.id}>
                <div className="group-title">
                  <div className="heading">
                    <img src={user.icon} alt="" />
                    <span>{user.title}</span>
                  </div>
                  <div className="heading">
                    <img src={add} alt="" />
                    <img src={menu} alt="" />
                  </div>
                </div>
                {data?.tickets
                  .filter((ticket) => ticket.userId === user.id)
                  .sort((a, b) =>
                    ordering === "Priority"
                      ? b.priority - a.priority
                      : ordering === "title"
                      ? a.title.localeCompare(b.title)
                      : 0
                  )
                  .map((ticket) => (
                    <Card
                      key={ticket.id}
                      title={ticket.id}
                      content={ticket.title}
                      priorityLevel={ticket.priority}
                    />
                  ))}
              </div>
            ))}
      </div>
    </>
  );
}

export default HomePage;
