import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useDrawerContext } from '../../contexts';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

interface MenuLateralProps {
  children: React.ReactNode;
}

interface IlistItemLinkProps {
  label: string;
  icon: string;
  to: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IlistItemLinkProps> = ({
  to,
  icon,
  label,
  onClick,
}) => {
  const navigate = useNavigate();

  const reselvedPath = useResolvedPath(to);
  const match = useMatch({ path: reselvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const MenuLateral: React.FC<MenuLateralProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? 'temporary' : 'permanent'}
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src="/static/images/avatar/1.jpg"
            />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              <ListItemLink
                to="/pagina-inicial"
                icon="home"
                label="Página Inicial"
                onClick={smDown ? toggleDrawerOpen : undefined}
              />
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
