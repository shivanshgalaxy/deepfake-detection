import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard.tsx';
import Analytics from './components/Analytics';
import UserManagement from './components/UserManagement';
import Notifications from './components/Notifications.tsx';
import {ThemeProvider} from "@/components/ThemeProvider.tsx";

const App: React.FC = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/analytics" element={<Analytics/>}/>
                        <Route path="/users" element={<UserManagement/>}/>
                        <Route path="/notifications" element={<Notifications/>}/>
                    </Routes>
                </Layout>
            </Router>
        </ThemeProvider>
    );
};

export default App;