import React,{useEffect,useState} from "react";
import { useAuth } from "../../components/introduce/useAuth.js";
import Sales_daily from "./user_daily.js"
import Useronline from "./useronlinecard.js"
// src/index.js hoặc src/App.js'
// import CalendarComponent from "../Calendar/index.js"
// import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./x1.css";
function Home() {
  const { user, loading } = useAuth();
  const [totalrevenue,setTotalrevenue] =useState({percentChange:"0%",totalRevenueToday:"0",state:""});
  const [totalincome,setTotalincome] =useState({
    profitToday:0,
    profitYesterday:0,
    percentChange:"0%",
    message: "notchange",
});
const  [data,setData]=useState([])
const  [topproduct,setTopproduct]=useState([])
const [newcustomer,setNewcustomer] =useState({
  customerToday:0,
  customerYesterday:0,
  percentChange:"0%",
  state: "notchange",
});
const [pending,setPending]=useState({total:0,percent:"0%"})
const [act,setAct]=useState([])
  const datas = [
    { name: "Jan", "Khách hàng trung thành": 270, "khách hàng mới": 150, "Khách hàng quay lại": 542 },
    { name: "Feb", "Khách hàng trung thành": 310, "khách hàng mới": 180, "Khách hàng quay lại": 520 },
    { name: "Mar", "Khách hàng trung thành": 350, "khách hàng mới": 200, "Khách hàng quay lại": 560 },
    { name: "Apr", "Khách hàng trung thành": 330, "khách hàng mới": 220, "Khách hàng quay lại": 480 },
    { name: "May", "Khách hàng trung thành": 450, "khách hàng mới": 260, "Khách hàng quay lại": 550 },
    { name: "Jun", "Khách hàng trung thành": 400, "khách hàng mới": 290, "Khách hàng quay lại": 580 },
    { name: "Jul", "Khách hàng trung thành": 460, "khách hàng mới": 320, "Khách hàng quay lại": 620 },
    { name: "Aug", "Khách hàng trung thành": 510, "khách hàng mới": 340, "Khách hàng quay lại": 680 },
    { name: "Sep", "Khách hàng trung thành": 252, "khách hàng mới": 360, "Khách hàng quay lại": 740 },
    { name: "Oct", "Khách hàng trung thành": 680, "khách hàng mới": 390, "Khách hàng quay lại": 820 },
    { name: "Nov", "Khách hàng trung thành": 780, "khách hàng mới": 420, "Khách hàng quay lại": 890 },
    { name: "Dec", "Khách hàng trung thành": 900, "khách hàng mới": 450, "Khách hàng quay lại": 980 },
  ];

  // if (!user) {
  //   return <div>Không có người dùng nào đăng nhập.</div>;
  // }
  useEffect(() => {
    const fetchData = async () => {
      if (loading) return;
      const get_revenue = async () => {
        try {
          const response = await fetch('http://localhost:5000/home/total_revenue', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: user,
            }),
          });
  
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
  
          const data = await response.json();
          console.log("Revenue:", data);
          setTotalrevenue(data);
        } catch (error) {
          console.error("Error fetching revenue:", error);
        }
      };
  
      const get_income = async () => {
        try {
          const response = await fetch('http://localhost:5000/home/today_income', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: user,
            }),
          });
  
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
  
          const data = await response.json();
          console.log("Income:", data);
          setTotalincome(data);
        } catch (error) {
          console.error("Error fetching income:", error);
        }
      };
      const get_customer = async () => {
        try {
          const response = await fetch('http://localhost:5000/home/new_customer', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: user,
            }),
          });
  
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
  
          const data = await response.json();
          console.log("customer:", data);
          setNewcustomer(data);
        } catch (error) {
          console.error("Error fetching income:", error);
        }
      };
      const get_report_customer=async()=>{
        try {
          const response = await fetch('http://localhost:5000/home/generateCustomerReport', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: user,
            }),
          });
  
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
  
          const data = await response.json();
          console.log("customer:", data);
          setData(data)
        } catch (error) {
          console.error("Error fetching income:", error);
        }
      }
      const get_top_product=async()=>{
        try {
          const response = await fetch('http://localhost:5000/home/generate_top_product', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: user,
            }),
          });
  
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
  
          const data = await response.json();
          console.log("products:", data);
          setTopproduct(data)
        } catch (error) {
          console.error("Error fetching income:", error);
        }
      }
      const get_pending=async()=>{
        try {
          const response = await fetch('http://localhost:5000/home/total_pending', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: user,
            }),
          });
  
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          console.log("pending:", data);
          setPending(data)
        } catch (error) {
          console.error("Error fetching income:", error);
        }
      }
      const get_activity=async () => {
      try{
        const activity = await fetch('http://localhost:5000/home/recent_activity',{
          method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: user,
            }),

        });
        const data=await activity.json();
      
        setAct(data.events);
      }catch (error) {
        console.error("Error fetching activity:", error)
      }
      }

      await Promise.all([get_revenue(), get_income(),get_customer(),get_report_customer(),get_top_product(),get_pending(),get_activity()]);
    };
  
    fetchData();
  }, [loading]); // Thêm 'user' vào dependencies nếu cần
  
  return (<>
    <div className="container">
      <div className="page-inner">
        <div className="dashboard-container">
          <div className="dashboard-title">
            <h3>Trang chủ</h3>
            <h6>Made by team 24</h6>
          </div>
          <div className="dashboard-actions">
            <a href="#">Manage</a>
            <a href="#">Add Admin</a>
          </div>
        </div>
        <div className="row row-card-no-pd">
          <div className="col-12 col-sm-6 col-md-6 col-xl-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6>
                      <b style={{ whiteSpace: "nowrap", 
  overflow: "hidden",
  textOverflow: "ellipsis" }}>Todays Resolve</b>
                    </h6>
                    <p className="text-muted">All Customs Value</p>
                  </div><h4 className="text-info fw-bold"></h4>
                </div>
                <div className="progress progress-sm">
                  <div
                    className="progress-bar bg-info"
                    role="progressbar"
                    
                  ></div>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="text-muted">Change</p>
                  <p className="text-muted"><small></small></p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-xl-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6>
                      <b>Total Problem</b>
                      
                    </h6>
                    <p className="text-muted">All Customs Resolve</p>
                  </div><h4 className="text-success fw-bold"></h4>
                </div>
                <div className="progress progress-sm">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                   
                  ></div>
                  
                </div>
                <div className="d-flex justify-content-between">
                  <p className="text-muted">Change</p>
                  <p className="text-muted"><small></small></p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-xl-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6>
                      <b>Pending </b>
                      
                    </h6>
                    <p className="text-muted">Fresh Amount</p>
                  </div><h4 className="text-danger fw-bold"></h4>
                </div>
                <div className="progress progress-sm">
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    
                  ></div>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="text-muted">Change</p>
                  <p className="text-muted"></p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-xl-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6>
                      <b>New Customer</b>
                      
                    </h6>
                    <p className="text-muted">Joined New User</p>
                  </div><h4 className="text-secondary fw-bold"></h4>
                </div>
                <div className="progress progress-sm">
                  <div
                    className="progress-bar bg-secondary"
                    role="progressbar"
   
                  ></div>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="text-muted">Change</p>
                  <p className="text-muted"><small></small></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-card-no-pd" > 
          <div className="col-md-8">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-header">
                <div className="card-head-row">
                  <div className="card-title">Thống kê người dùng</div>
                  <div className="card-tools">
                    <a
                      href="#"
                      className="btn btn-label-success btn-round btn-sm me-2"
                    >
                      <span className="btn-label">
                        <i className="fa fa-pencil"></i>
                      </span>
                      Export
                    </a>
                    <a href="#" className="btn btn-label-info btn-round btn-sm">
                      <span className="btn-label">
                        <i className="fa fa-print"></i>
                      </span>
                      Print
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="chart-container" style={{ minHeight: "375px" }}>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={datas}>
                      <XAxis dataKey="name" />
                      <YAxis type="number" domain={[0, "dataMax"]} />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="khách hàng mới"
                        stroke="#ffa726"
                        fill="#1e88e5"
                        fillOpacity={0.8}
                      />
                      <Area
                        type="monotone"
                        dataKey="Khách hàng trung thành"
                        stroke="#ff6b6b"
                        fill="red"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="Khách hàng quay lại"
                        stroke="#2196f3"
                        fill="#0277bd"
                        fillOpacity={0.4}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div id="myChartLegend"></div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-primary">
              <div className="card card-primary">
<Sales_daily />

              </div>
            
            </div>
            <div className="card">

              <Useronline />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="card">
            
            
            </div>
          </div>
          <div className="col-md-4" style={{maxHeight:"645px",overflowY:"auto",marginBottom:"15px"}}>
            <div className="card">
              <div className="card-header">
                <div className="card-title">Top Problems</div>
              </div>
              <div className="card-body pb-0">
              
                <div className="d-flex ">
                  <div className="avatar">
                    <img
                      src="assets/img/logoproduct.svg"
                      alt="..."
                      className="avatar-img rounded-circle"
                    />
                  </div>
                  <div className="flex-1 pt-1 ms-2">
                    <h6 className="fw-bold mb-1">CSS</h6>
                    <small className="text-muted">Cascading Style Sheets</small>
                  </div>
                  <div className="d-flex ms-auto align-items-center">
                    <h4 className="text-info fw-bold">+$17</h4>
                  </div>
                </div>
                <div className="separator-dashed"></div>
                <div className="d-flex">
                  <div className="avatar">
                    <img
                      src="assets/img/logoproduct.svg"
                      alt="..."
                      className="avatar-img rounded-circle"
                    />
                  </div>
                  <div className="flex-1 pt-1 ms-2">
                    <h6 className="fw-bold mb-1">J.CO Donuts</h6>
                    <small className="text-muted">The Best Donuts</small>
                  </div>
                  <div className="d-flex ms-auto align-items-center">
                    <h4 className="text-info fw-bold">+$300</h4>
                  </div>
                </div>
                <div className="separator-dashed"></div>
                <div className="d-flex">
                  <div className="avatar">
                    <img
                      src="assets/img/logoproduct3.svg"
                      alt="..."
                      className="avatar-img rounded-circle"
                    />
                  </div>
                  <div className="flex-1 pt-1 ms-2">
                    <h6 className="fw-bold mb-1">Ready Pro</h6>
                    <small className="text-muted">
                      Bootstrap 5 Admin Dashboard
                    </small>
                  </div>
                  <div className="d-flex ms-auto align-items-center">
                    <h4 className="text-info fw-bold">+$350</h4>
                  </div>
                </div>
                <div className="separator-dashed"></div>
                <div className="pull-in">
                  <canvas id="topProductsChart"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{marginTop:"10px"}}>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <div className="card-head-row card-tools-still-right">
                  <div className="card-title">Recent Activity</div>
                  <div className="card-tools">
                    {/* <div className="dropdown">
                      <button
                        className="btn btn-icon btn-clean"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fas fa-ellipsis-h"></i>
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="card-body">
                <ol className="activity-feed">
                  {act.map(act =>{
                    return(
                      <li className={"feed-item "+ act.type}>
                    <time className="date" datetime={act.date}>
                      {act.date}
                    </time>
                    <span className="text" dangerouslySetInnerHTML={{
              __html: act.detail,  // Hiển thị HTML (thẻ <br /> sẽ được xử lý)
            }}>
                     
                    </span>
                  </li>
                    )
                  })}
                  <li className="feed-item feed-item-secondary">
                    <time className="date" datetime="9-25">
                      Sep 25
                    </time>
                    <span className="text">
                      Responded to need
                      <a href="#">"Volunteer opportunity"</a>
                    </span>
                  </li>
                  <li className="feed-item feed-item-success">
                    <time className="date" datetime="9-24">
                      Sep 24
                    </time>
                    <span className="text">
                      Added an interest
                      <a href="#">"Volunteer Activities"</a>
                    </span>
                  </li>
                  <li className="feed-item feed-item-info">
                    <time className="date" datetime="9-23">
                      Sep 23
                    </time>
                    <span className="text">
                      Joined the group
                      <a href="single-group.php">"Boardsmanship Forum"</a>
                    </span>
                  </li>
                  <li className="feed-item feed-item-warning">
                    <time className="date" datetime="9-21">
                      Sep 21
                    </time>
                    <span className="text">
                      Responded to need
                      <a href="#">"In-Kind Opportunity"</a>
                    </span>
                  </li>
                  <li className="feed-item feed-item-danger">
                    <time className="date" datetime="9-18">
                      Sep 18
                    </time>
                    <span className="text">
                      Created need
                      <a href="#">"Volunteer Opportunity"</a>
                    </span>
                  </li>
                  <li className="feed-item">
                    <time className="date" datetime="9-17">
                      Sep 17
                    </time>
                    <span className="text">
                      Attending the event
                      <a href="single-event.php">"Some New Event"</a>
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <div className="card-head-row">
                  <div className="card-title">Information</div>
                  <div className="card-tools">
                    <ul
                      className="nav nav-pills nav-secondary nav-pills-no-bd nav-sm"
                      id="pills-tab"
                      role="tablist"
                    >
                   
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex">
                  <div className="avatar avatar-online">
                    <span className="avatar-title rounded-circle border border-white bg-info">
                      J
                    </span>
                  </div>
                  <div className="flex-1 ms-3 pt-1">
                    <h6 className="text-uppercase fw-bold mb-1">
                      Joko Subianto
                      <span className="text-warning ps-3">pending</span>
                    </h6>
                    <span className="text-muted">
                      I am facing some trouble with my viewport. When i start my
                    </span>
                  </div>
                  <div className="float-end pt-1">
                    <small className="text-muted">8:40 PM</small>
                  </div>
                </div>
                <div className="separator-dashed"></div>
                <div className="d-flex">
                  <div className="avatar avatar-offline">
                    <span className="avatar-title rounded-circle border border-white bg-secondary">
                      P
                    </span>
                  </div>
                  <div className="flex-1 ms-3 pt-1">
                    <h6 className="text-uppercase fw-bold mb-1">
                      Prabowo Widodo
                      <span className="text-success ps-3">open</span>
                    </h6>
                    <span className="text-muted">
                      I have some query regarding the license issue.
                    </span>
                  </div>
                  <div className="float-end pt-1">
                    <small className="text-muted">1 Day Ago</small>
                  </div>
                </div>
                <div className="separator-dashed"></div>
                <div className="d-flex">
                  <div className="avatar avatar-away">
                    <span className="avatar-title rounded-circle border border-white bg-danger">
                      L
                    </span>
                  </div>
                  <div className="flex-1 ms-3 pt-1">
                    <h6 className="text-uppercase fw-bold mb-1">
                      Lee Chong Wei
                      <span className="text-muted ps-3">closed</span>
                    </h6>
                    <span className="text-muted">
                      Is there any update plan for RTL version near future?
                    </span>
                  </div>
                  <div className="float-end pt-1">
                    <small className="text-muted">2 Days Ago</small>
                  </div>
                </div>
                <div className="separator-dashed"></div>
                <div className="d-flex">
                  <div className="avatar avatar-offline">
                    <span className="avatar-title rounded-circle border border-white bg-secondary">
                      P
                    </span>
                  </div>
                  <div className="flex-1 ms-3 pt-1">
                    <h6 className="text-uppercase fw-bold mb-1">
                      Peter Parker
                      <span className="text-success ps-3">open</span>
                    </h6>
                    <span className="text-muted">
                      I have some query regarding the license issue.
                    </span>
                  </div>
                  <div className="float-end pt-1">
                    <small className="text-muted">2 Day Ago</small>
                  </div>
                </div>
                <div className="separator-dashed"></div>
                <div className="d-flex">
                  <div className="avatar avatar-away">
                    <span className="avatar-title rounded-circle border border-white bg-danger">
                      L
                    </span>
                  </div>
                  <div className="flex-1 ms-3 pt-1">
                    <h6 className="text-uppercase fw-bold mb-1">
                      Logan Paul <span className="text-muted ps-3">closed</span>
                    </h6>
                    <span className="text-muted">
                      Is there any update plan for RTL version near future?
                    </span>
                  </div>
                  <div className="float-end pt-1">
                    <small className="text-muted">2 Days Ago</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer className="footer">
    <div className="container-fluid d-flex justify-content-between">
      <nav className="pull-left">
        
      </nav>
   
    
    </div>
  </footer></>
  );
}

export default Home;
