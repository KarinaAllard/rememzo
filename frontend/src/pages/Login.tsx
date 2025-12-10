export const Login = () => {
    return (
        <div className="">
            <h1 className="text-4xl text-(--text) mb-6">Log in</h1>
            <form className="flex flex-col">
                <label className="mb-4">Email
                    <br/>
                    <input type="email" name="email" id="email" className="border border-(--text-hover)" />
                </label>
                <label className="mb-4">Password
                    <br/>
                <input type="password" name="password" id="password" className="border border-(--text-hover)" />
                </label>
                <input type="submit" value="Log in" />
            </form>
        </div>
    )
}