/**
 * / 로 접근시 MainLayout 을 타게되고 ''같이 경로가 없다면 Home 을 보여주게됩니다.
 * 이후 /login, /register, /rank ... 을 추가로 보여줘야하는데 Header와 Footer가 같다면
 * MainLayout의 하위에 해당컴포넌트(정확히는 viewPage)를 추가하면됩니다
 *
 * 만약 Header, Footer 등을 변경하는 새로운페이지를 만들게된다면 새로운 레이아웃을 만든후,
 * 하위 컴포넌트를 추가하면됩니다.
 * @constructor
 */
declare const Router: () => import("react/jsx-runtime").JSX.Element;
export default Router;
