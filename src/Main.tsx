import React, { useRef } from 'react';

import MainNavigator, { NavigatorRefProps } from 'src/navigation/MainNavigator';

interface MainProps {
    onNavigationReadyCb: () => void;
}

/**
 *
 *
 */
const Main: React.FC<MainProps> = ({ onNavigationReadyCb }) => {
    const navigatorRef = useRef<NavigatorRefProps>(null);

    return <MainNavigator onNavigationReadyCb={onNavigationReadyCb} ref={navigatorRef} />;
};

export default Main;
