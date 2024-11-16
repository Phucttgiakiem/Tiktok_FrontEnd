import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes,privateRoutes } from 'routes';
import  DefaultLayout  from '~/layouts';
import { Fragment } from 'react';
import Cookies from 'js-cookie';
function App() {
     // Giả sử trạng thái đăng nhập là một biến lấy từ Redux hoặc Context
     const isLoggedIn = !!Cookies.get('iduser'); // Thay thế bằng logic thực tế của bạn
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {/* Các route yêu cầu đăng nhập */}
                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    isLoggedIn ? (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    ) : (
                                        <Navigate to="/" replace />
                                    )
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
