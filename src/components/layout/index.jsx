// eslint-disable-next-line react/prop-types
function Layout({children}) {
    return (
        <main className="content">
    <div className="container p-0">

		<h1 className="h4 mb-3">Chat App</h1>

		<div className="card">
        <div className="row g-0">
            {children}
        </div>
		</div>
	</div>
</main>
    )
}

export default Layout;