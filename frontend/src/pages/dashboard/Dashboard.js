import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress, Box, Grid } from '@mui/material';
import {
  useManagementDispatch,
  useManagementState,
} from '../../context/ManagementContext';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
// styles
import useStyles from './styles';
// components
import Widget from '../../components/Widget/Widget';

const Dashboard = () => {
  let classes = useStyles();
  const managementDispatch = useManagementDispatch();
  const managementValue = useManagementState();

  const [users, setUsers] = useState(0);
  const [category, setCategory] = useState(0);
  const [top_category, setTop_category] = useState(0);
  const [customer, setCustomer] = useState(0);
  const [opco, setOpco] = useState(0);
  const [goal_type, setGoal_type] = useState(0);
  const [initiative, setInitiative] = useState(0);
  const [opco_address, setOpco_address] = useState(0);
  const [opco_contact, setOpco_contact] = useState(0);
  const [goals, setGoals] = useState(0);
  const [goal_number_direction, setGoal_number_direction] = useState(0);
  const [journey, setJourney] = useState(0);
  const [address_state, setAddress_state] = useState(0);

  const [currentUser, setCurrentUser] = useState(null);

  async function loadData() {
    const fns = [
      setUsers,
      setCategory,
      setTop_category,
      setCustomer,
      setOpco,
      setGoal_type,
      setInitiative,
      setOpco_address,
      setOpco_contact,
      setGoals,
      setGoal_number_direction,
      setJourney,
      setAddress_state,
    ];

    const responseUsers = await axios.get(`/users/count`);
    const responseCategory = await axios.get(`/category/count`);
    const responseTop_category = await axios.get(`/top_category/count`);
    const responseCustomer = await axios.get(`/customer/count`);
    const responseOpco = await axios.get(`/opco/count`);
    const responseGoal_type = await axios.get(`/goal_type/count`);
    const responseInitiative = await axios.get(`/initiative/count`);
    const responseOpco_address = await axios.get(`/opco_address/count`);
    const responseOpco_contact = await axios.get(`/opco_contact/count`);
    const responseGoals = await axios.get(`/goals/count`);
    const responseGoal_number_direction = await axios.get(
      `/goal_number_direction/count`,
    );
    const responseJourney = await axios.get(`/journey/count`);
    const responseAddress_state = await axios.get(`/address_state/count`);
    Promise.all([
      responseUsers,
      responseCategory,
      responseTop_category,
      responseCustomer,
      responseOpco,
      responseGoal_type,
      responseInitiative,
      responseOpco_address,
      responseOpco_contact,
      responseGoals,
      responseGoal_number_direction,
      responseJourney,
      responseAddress_state,
    ])
      .then((res) => res.map((el) => el.data))
      .then((data) => data.forEach((el, i) => fns[i](el.count)));
  }

  useEffect(() => {
    setCurrentUser(managementValue.currentUser);
    loadData();
  }, [managementDispatch, managementValue]);

  if (!currentUser) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <h1 className='page-title'>
        Welcome, {currentUser.firstName}! <br />
        <small>
          <small>Your role is {currentUser.role}</small>
        </small>
      </h1>
      <Grid container alignItems='center' columns={12} spacing={3}>
        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/users'} style={{ textDecoration: 'none' }}>
            <Widget title={'Users'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Users:{' '}
                  <span className={classes.widgetTextCount}>{users}</span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/category'} style={{ textDecoration: 'none' }}>
            <Widget title={'Category'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Category:{' '}
                  <span className={classes.widgetTextCount}>{category}</span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/top_category'} style={{ textDecoration: 'none' }}>
            <Widget title={'Top_category'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Top_category:{' '}
                  <span className={classes.widgetTextCount}>
                    {top_category}
                  </span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/customer'} style={{ textDecoration: 'none' }}>
            <Widget title={'Customer'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Customer:{' '}
                  <span className={classes.widgetTextCount}>{customer}</span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/opco'} style={{ textDecoration: 'none' }}>
            <Widget title={'Opco'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Opco: <span className={classes.widgetTextCount}>{opco}</span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/goal_type'} style={{ textDecoration: 'none' }}>
            <Widget title={'Goal_type'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Goal_type:{' '}
                  <span className={classes.widgetTextCount}>{goal_type}</span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/initiative'} style={{ textDecoration: 'none' }}>
            <Widget title={'Initiative'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Initiative:{' '}
                  <span className={classes.widgetTextCount}>{initiative}</span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/opco_address'} style={{ textDecoration: 'none' }}>
            <Widget title={'Opco_address'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Opco_address:{' '}
                  <span className={classes.widgetTextCount}>
                    {opco_address}
                  </span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/opco_contact'} style={{ textDecoration: 'none' }}>
            <Widget title={'Opco_contact'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Opco_contact:{' '}
                  <span className={classes.widgetTextCount}>
                    {opco_contact}
                  </span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/goals'} style={{ textDecoration: 'none' }}>
            <Widget title={'Goals'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Goals:{' '}
                  <span className={classes.widgetTextCount}>{goals}</span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link
            to={'/admin/goal_number_direction'}
            style={{ textDecoration: 'none' }}
          >
            <Widget title={'Goal_number_direction'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Goal_number_direction:{' '}
                  <span className={classes.widgetTextCount}>
                    {goal_number_direction}
                  </span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/journey'} style={{ textDecoration: 'none' }}>
            <Widget title={'Journey'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Journey:{' '}
                  <span className={classes.widgetTextCount}>{journey}</span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/address_state'} style={{ textDecoration: 'none' }}>
            <Widget title={'Address_state'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Address_state:{' '}
                  <span className={classes.widgetTextCount}>
                    {address_state}
                  </span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
