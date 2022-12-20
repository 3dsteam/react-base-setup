import React, {ReactElement} from "react";
import {ButtonComponent} from "@syncfusion/ej2-react-buttons";
import Logo from '@assets/logo.png';
import {useNavigate} from "react-router-dom";
import {AppBarComponent, SidebarComponent} from "@syncfusion/ej2-react-navigations";

export type ItemMenu = {
    type: 'page' | 'action';
    text: string;
    icon: string;
    path?: string;
    callback?: () => void;
    viewInBottomBar?: boolean;
    bottomBarOnly?: boolean;
}

interface Props {
    items: ItemMenu[];
    children: ReactElement;
}

export const Menu = ({items, children}: Props): ReactElement => {

    const navigate = useNavigate();

    // Check if lg size
    const isLg = window.matchMedia('(min-width: 1024px)').matches;

    // State
    const [openSidebar, setOpenSidebar] = React.useState<boolean>(true);

    const onItemClick = (item: ItemMenu) => {
        if (item.callback) {
            // Execute callback
            item.callback();
        } else if (item.path) {
            // Navigate to path
            navigate(item.path);
        }
    }

    return (
        <>
            {/* Sidebar */}
            {
                isLg
                    ? <SidebarComponent
                        target='#app'
                        width='300px'
                        position='Left'
                        isOpen={openSidebar}
                        enableGestures={false}
                        open={() => setOpenSidebar(true)}
                        close={() => setOpenSidebar(false)}
                    >
                        <div className="h-full p-4 space-y-4 bg-primary">
                            {/* Logo */}
                            <img src={Logo} alt="Logo" className='object-contain'/>
                            {
                                // Menu items
                                items.filter(i => !i.bottomBarOnly).map((item, index) => (
                                    <ButtonComponent
                                        key={index}
                                        content={item.text}
                                        iconCss={item.icon}
                                        isPrimary={true}
                                        cssClass='sidebar-button'
                                        onClick={() => onItemClick(item)}
                                    />
                                ))
                            }
                        </div>
                    </SidebarComponent>
                    : <></>
            }
            {/* Container */}
            <div className='h-full'>
                {/* AppBar */}
                <AppBarComponent
                    isSticky={true}
                    color={isLg ? undefined : 'Primary'}
                    position={isLg ? 'Top' : 'Bottom'}
                >
                    <>
                        {
                            // Toggle sidebar
                            isLg
                                ? <ButtonComponent
                                    iconCss='fa-regular fa-bars'
                                    cssClass='e-flat'
                                    onClick={() => setOpenSidebar(!openSidebar)}
                                />
                                : <></>
                        }
                        {/* Empty */}
                        {
                            // Items
                            !isLg
                                ? items.filter(i => i.viewInBottomBar || i.bottomBarOnly).map((item, index) => (
                                    <React.Fragment key={index}>
                                        <ButtonComponent
                                            iconCss={item.icon}
                                            isPrimary={true}
                                            cssClass='mx-2'
                                            onClick={() => onItemClick(item)}
                                        />
                                        {
                                            // Check if last index
                                            index === items.length - 1
                                                ? <></>
                                                : <div className="e-appbar-spacer"></div>
                                        }
                                    </React.Fragment>
                                ))
                                : <></>
                        }
                    </>
                </AppBarComponent>
                {/* Content */}
                {children}
            </div>
        </>
    )
}