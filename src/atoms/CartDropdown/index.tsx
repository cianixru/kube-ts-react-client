// tslint:disable:no-magic-numbers
import {
  Badge,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import _isNil from 'ramda/src/isNil';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import courseImagePlaceholder from '../../images/course_400x180.png';
import { State } from '../../redux/rootReducer';
import assetsUrl from '../../utils/helpers/assetsUrl';
import sumBy from '../../utils/helpers/sumBy';

const StyledMenu = withStyles({
  list: {
    padding: 0,
  },
  paper: {
    border: '1px solid #d3d4d5',
    borderRadius: 0,
  },
})((props: any) => (
  <Menu
    autoFocus={false}
    elevation={0}
    getContentAnchorEl={null}
    variant="menu"
    anchorOrigin={{
      horizontal: 'center',
      vertical: 'bottom',
    }}
    transformOrigin={{
      horizontal: 'center',
      vertical: 'top',
    }}
    {...props}
  />
));

const CartDropdown = () => {
  // TODO: refactor component
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { t } = useTranslation();
  const { items } = useSelector((state: State) => state.cart);
  const history = useHistory();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToCart = (e: any) => {
    e.preventDefault();
    handleClose();
    history.push('/cart');
  };

  const goToCourse = (slug: string) => () => {
    handleClose();
    history.push(`/courses/${slug}`);
  };

  // TODO: implements pricing on server
  const courseItems = items.map(item => ({ ...item, price: 19.99 }));

  const total = sumBy('price')(courseItems);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        color="inherit"
        variant="outlined"
        onClick={goToCart}
        onMouseEnter={handleClick}
      >
        <Badge badgeContent={items.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuList
          onMouseLeave={handleClose}
          disablePadding
          style={{ maxWidth: 400, width: '100%' }}
        >
          {courseItems.map(item => {
            const imageUrl = _isNil(item.imageUrl)
              ? courseImagePlaceholder
              : assetsUrl(item.imageUrl);

            return (
              <MenuItem onClick={goToCourse(item.slug)} key={item.id}>
                <ListItemAvatar style={{ marginRight: 10 }}>
                  <img
                    src={imageUrl}
                    style={{ width: 100, height: 60 }}
                    alt={item.title}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.title}
                  secondary={
                    <>
                      <span>
                        {t('cart.instructor')}: {item.user.firstName}{' '}
                        {item.user.lastName}
                      </span>
                      <br />
                      {t('cart.price')}:
                      <span
                        style={{
                          color: '#000',
                          fontWeight: 'bold',
                          marginLeft: 5,
                          textAlign: 'right',
                        }}
                      >
                        £{item.price}
                      </span>
                    </>
                  }
                />
              </MenuItem>
            );
          })}
          <li style={{ padding: 10 }}>
            <Typography variant="h6" style={{ marginBottom: 10 }}>
              {t('cart.total')}: £{total.toFixed(2)}
            </Typography>

            <Button
              variant="contained"
              fullWidth
              color="secondary"
              onClick={goToCart}
            >
              {t('cart.goToCart')}
            </Button>
          </li>
        </MenuList>
      </StyledMenu>
    </div>
  );
};

// tslint:disable-next-line:max-file-line-count
export default CartDropdown;
