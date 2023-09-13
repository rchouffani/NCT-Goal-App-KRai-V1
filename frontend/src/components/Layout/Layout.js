import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import classnames from 'classnames';

import SettingsIcon from '@mui/icons-material/Settings';
import GithubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import { Fab, IconButton } from '@mui/material';
import { connect } from 'react-redux';
// styles
import useStyles from './styles';

// components
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import { Link } from '../Wrappers';
import ColorChangeThemePopper from './components/ColorChangeThemePopper';

import EditUser from '../../pages/user/EditUser';

// pages
import Dashboard from '../../pages/dashboard';
import BreadCrumbs from '../../components/BreadCrumbs';

// context
import { useLayoutState } from '../../context/LayoutContext';

import UsersFormPage from 'pages/CRUD/Users/form/UsersFormPage';
import UsersTablePage from 'pages/CRUD/Users/table/UsersTablePage';

import CategoryFormPage from 'pages/CRUD/Category/form/CategoryFormPage';
import CategoryTablePage from 'pages/CRUD/Category/table/CategoryTablePage';

import Top_categoryFormPage from 'pages/CRUD/Top_category/form/Top_categoryFormPage';
import Top_categoryTablePage from 'pages/CRUD/Top_category/table/Top_categoryTablePage';

import CustomerFormPage from 'pages/CRUD/Customer/form/CustomerFormPage';
import CustomerTablePage from 'pages/CRUD/Customer/table/CustomerTablePage';

import OpcoFormPage from 'pages/CRUD/Opco/form/OpcoFormPage';
import OpcoTablePage from 'pages/CRUD/Opco/table/OpcoTablePage';

import Goal_typeFormPage from 'pages/CRUD/Goal_type/form/Goal_typeFormPage';
import Goal_typeTablePage from 'pages/CRUD/Goal_type/table/Goal_typeTablePage';

import InitiativeFormPage from 'pages/CRUD/Initiative/form/InitiativeFormPage';
import InitiativeTablePage from 'pages/CRUD/Initiative/table/InitiativeTablePage';

import Opco_addressFormPage from 'pages/CRUD/Opco_address/form/Opco_addressFormPage';
import Opco_addressTablePage from 'pages/CRUD/Opco_address/table/Opco_addressTablePage';

import Opco_contactFormPage from 'pages/CRUD/Opco_contact/form/Opco_contactFormPage';
import Opco_contactTablePage from 'pages/CRUD/Opco_contact/table/Opco_contactTablePage';

import GoalsFormPage from 'pages/CRUD/Goals/form/GoalsFormPage';
import GoalsTablePage from 'pages/CRUD/Goals/table/GoalsTablePage';

import Goal_number_directionFormPage from 'pages/CRUD/Goal_number_direction/form/Goal_number_directionFormPage';
import Goal_number_directionTablePage from 'pages/CRUD/Goal_number_direction/table/Goal_number_directionTablePage';

import JourneyFormPage from 'pages/CRUD/Journey/form/JourneyFormPage';
import JourneyTablePage from 'pages/CRUD/Journey/table/JourneyTablePage';

import Address_stateFormPage from 'pages/CRUD/Address_state/form/Address_stateFormPage';
import Address_stateTablePage from 'pages/CRUD/Address_state/table/Address_stateTablePage';

const Redirect = (props) => {
  useEffect(() => window.location.replace(props.url));
  return <span>Redirecting...</span>;
};

function Layout(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'add-section-popover' : undefined;
  const handleClick = (event) => {
    setAnchorEl(open ? null : event.currentTarget);
  };

  // global
  let layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <Header history={props.history} />
      <Sidebar />
      <div
        className={classnames(classes.content, {
          [classes.contentShift]: layoutState.isSidebarOpened,
        })}
      >
        <div className={classes.fakeToolbar} />
        <BreadCrumbs />
        <Switch>
          <Route path='/admin/dashboard' component={Dashboard} />
          <Route path='/admin/user/edit' component={EditUser} />
          <Route
            path={'/admin/api-docs'}
            exact
            component={(props) => (
              <Redirect
                url={
                  process.env.NODE_ENV === 'production'
                    ? window.location.origin + '/api-docs'
                    : 'http://localhost:8080/api-docs'
                }
                {...props}
              />
            )}
          />

          <Route path={'/admin/users'} exact component={UsersTablePage} />
          <Route path={'/admin/users/new'} exact component={UsersFormPage} />
          <Route
            path={'/admin/users/:id/edit'}
            exact
            component={UsersFormPage}
          />

          <Route path={'/admin/category'} exact component={CategoryTablePage} />
          <Route
            path={'/admin/category/new'}
            exact
            component={CategoryFormPage}
          />
          <Route
            path={'/admin/category/:id/edit'}
            exact
            component={CategoryFormPage}
          />

          <Route
            path={'/admin/top_category'}
            exact
            component={Top_categoryTablePage}
          />
          <Route
            path={'/admin/top_category/new'}
            exact
            component={Top_categoryFormPage}
          />
          <Route
            path={'/admin/top_category/:id/edit'}
            exact
            component={Top_categoryFormPage}
          />

          <Route path={'/admin/customer'} exact component={CustomerTablePage} />
          <Route
            path={'/admin/customer/new'}
            exact
            component={CustomerFormPage}
          />
          <Route
            path={'/admin/customer/:id/edit'}
            exact
            component={CustomerFormPage}
          />

          <Route path={'/admin/opco'} exact component={OpcoTablePage} />
          <Route path={'/admin/opco/new'} exact component={OpcoFormPage} />
          <Route path={'/admin/opco/:id/edit'} exact component={OpcoFormPage} />

          <Route
            path={'/admin/goal_type'}
            exact
            component={Goal_typeTablePage}
          />
          <Route
            path={'/admin/goal_type/new'}
            exact
            component={Goal_typeFormPage}
          />
          <Route
            path={'/admin/goal_type/:id/edit'}
            exact
            component={Goal_typeFormPage}
          />

          <Route
            path={'/admin/initiative'}
            exact
            component={InitiativeTablePage}
          />
          <Route
            path={'/admin/initiative/new'}
            exact
            component={InitiativeFormPage}
          />
          <Route
            path={'/admin/initiative/:id/edit'}
            exact
            component={InitiativeFormPage}
          />

          <Route
            path={'/admin/opco_address'}
            exact
            component={Opco_addressTablePage}
          />
          <Route
            path={'/admin/opco_address/new'}
            exact
            component={Opco_addressFormPage}
          />
          <Route
            path={'/admin/opco_address/:id/edit'}
            exact
            component={Opco_addressFormPage}
          />

          <Route
            path={'/admin/opco_contact'}
            exact
            component={Opco_contactTablePage}
          />
          <Route
            path={'/admin/opco_contact/new'}
            exact
            component={Opco_contactFormPage}
          />
          <Route
            path={'/admin/opco_contact/:id/edit'}
            exact
            component={Opco_contactFormPage}
          />

          <Route path={'/admin/goals'} exact component={GoalsTablePage} />
          <Route path={'/admin/goals/new'} exact component={GoalsFormPage} />
          <Route
            path={'/admin/goals/:id/edit'}
            exact
            component={GoalsFormPage}
          />

          <Route
            path={'/admin/goal_number_direction'}
            exact
            component={Goal_number_directionTablePage}
          />
          <Route
            path={'/admin/goal_number_direction/new'}
            exact
            component={Goal_number_directionFormPage}
          />
          <Route
            path={'/admin/goal_number_direction/:id/edit'}
            exact
            component={Goal_number_directionFormPage}
          />

          <Route path={'/admin/journey'} exact component={JourneyTablePage} />
          <Route
            path={'/admin/journey/new'}
            exact
            component={JourneyFormPage}
          />
          <Route
            path={'/admin/journey/:id/edit'}
            exact
            component={JourneyFormPage}
          />

          <Route
            path={'/admin/address_state'}
            exact
            component={Address_stateTablePage}
          />
          <Route
            path={'/admin/address_state/new'}
            exact
            component={Address_stateFormPage}
          />
          <Route
            path={'/admin/address_state/:id/edit'}
            exact
            component={Address_stateFormPage}
          />
        </Switch>
        <Fab
          color='primary'
          aria-label='settings'
          onClick={(e) => handleClick(e)}
          className={classes.changeThemeFab}
          style={{ zIndex: 100 }}
        >
          <SettingsIcon style={{ color: '#fff' }} />
        </Fab>
        <ColorChangeThemePopper id={id} open={open} anchorEl={anchorEl} />
        <Footer>
          <div>
            <Link
              color={'primary'}
              href={'https://flatlogic.com/'}
              target={'_blank'}
              className={classes.link}
            >
              Flatlogic
            </Link>
            <Link
              color={'primary'}
              href={'https://flatlogic.com/about'}
              target={'_blank'}
              className={classes.link}
            >
              About Us
            </Link>
            <Link
              color={'primary'}
              href={'https://flatlogic.com/blog'}
              target={'_blank'}
              className={classes.link}
            >
              Blog
            </Link>
          </div>
          <div>
            <Link href={'https://www.facebook.com/flatlogic'} target={'_blank'}>
              <IconButton aria-label='facebook'>
                <FacebookIcon style={{ color: '#6E6E6E99' }} />
              </IconButton>
            </Link>
            <Link href={'https://twitter.com/flatlogic'} target={'_blank'}>
              <IconButton aria-label='twitter'>
                <TwitterIcon style={{ color: '#6E6E6E99' }} />
              </IconButton>
            </Link>
            <Link href={'https://github.com/flatlogic'} target={'_blank'}>
              <IconButton
                aria-label='github'
                style={{ padding: '12px 0 12px 12px' }}
              >
                <GithubIcon style={{ color: '#6E6E6E99' }} />
              </IconButton>
            </Link>
          </div>
        </Footer>
      </div>
    </div>
  );
}

export default withRouter(connect()(Layout));
