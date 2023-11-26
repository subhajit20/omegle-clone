"use client"
import React from "react"
import Link from "next/link"

function Nav() {
	return (
		<div className="navbar">
			<div className="navbar-start">
				<Link className="navbar-item" href={"/"}>
					Omegle Clone
				</Link>
			</div>
			<div className="navbar-end">
				<Link className="navbar-item" href={"/"}>
					Home
				</Link>
			</div>
		</div>
	)
}

export default Nav
