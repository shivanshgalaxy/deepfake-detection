import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard.tsx';
import Authentication from './components/Authentication';
import Analytics from './components/Analytics';
import LocationServices from './components/LocationServices';
import UserManagement from './components/UserManagement';
import Notifications from './components/Notifications.tsx';
import ReportingTools from './components/ReportingTools';
import Support from './components/Support';
import {ThemeProvider} from "@/components/ThemeProvider.tsx";

const App: React.FC = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/auth" element={<Authentication/>}/>
                        <Route path="/analytics" element={<Analytics/>}/>
                        <Route path="/location" element={<LocationServices/>}/>
                        <Route path="/users" element={<UserManagement/>}/>
                        <Route path="/notifications" element={<Notifications/>}/>
                        <Route path="/reports" element={<ReportingTools/>}/>
                        <Route path="/support" element={<Support/>}/>
                    </Routes>
                </Layout>
            </Router>
        </ThemeProvider>
    );
};

export default App;