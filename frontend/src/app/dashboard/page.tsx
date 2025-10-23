'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  Card,
  CardContent,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

export default function DashboardPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return null;
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <DashboardIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {user.name}
          </Typography>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user.name}!
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 3 }}>
          <Card sx={{ flex: '1 1 300px', minWidth: 300 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <DashboardIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
                <Typography variant="h6">Dashboard</Typography>
              </Box>
              <Typography color="text.secondary">
                View system overview and analytics
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{ flex: '1 1 300px', minWidth: 300, cursor: 'pointer' }}
            onClick={() => router.push('/users')}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon sx={{ fontSize: 40, mr: 2, color: 'success.main' }} />
                <Typography variant="h6">Users</Typography>
              </Box>
              <Typography color="text.secondary">
                Manage user accounts and permissions
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ flex: '1 1 300px', minWidth: 300 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SettingsIcon sx={{ fontSize: 40, mr: 2, color: 'warning.main' }} />
                <Typography variant="h6">Settings</Typography>
              </Box>
              <Typography color="text.secondary">
                Configure system settings
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Quick Stats
          </Typography>
          <Typography color="text.secondary">
            Role: {user.role}
          </Typography>
          <Typography color="text.secondary">
            Email: {user.email}
          </Typography>
          <Typography color="text.secondary">
            Status: Active
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
