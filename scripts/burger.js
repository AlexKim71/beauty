class BurgerMenu {
	constructor(burgerSelector, menuSelector, delay = 100) {
		this.burger = document.querySelector(burgerSelector)
		this.menu = document.querySelector(menuSelector)
		this.delay = delay
		this.timeout = null
		this.scrollY = 0

		this.handleClick = this.handleClick.bind(this)
		this.init()
	}

	init() {
		if (!this.burger || !this.menu) {
			console.error('Burger or menu not found')
			return
		}
		this.burger.addEventListener('click', this.handleClick)
		window.addEventListener('resize', this.handleResize.bind(this))
	}

	handleClick() {
		clearTimeout(this.timeout)

		const isOpen = this.menu.classList.contains('open')

		if (isOpen) {
			this.menu.classList.remove('open')

			this.timeout = setTimeout(() => {
				this.burger.classList.remove('is-active')
				document.body.classList.remove('no-scroll')
				document.body.style.top = ''
				window.scrollTo(0, this.scrollY)
			}, this.delay)
		} else {
			this.scrollY = window.scrollY
			document.body.style.top = `-${this.scrollY}px`
			document.body.classList.add('no-scroll')
			this.menu.classList.add('open')

			this.timeout = setTimeout(() => {
				this.burger.classList.add('is-active')
			}, this.delay)
		}
	}

	handleResize() {
		if (this.menu.classList.contains('open')) {
			this.menu.classList.remove('open')
			this.burger.classList.remove('is-active')
			document.body.classList.remove('no-scroll')
			document.body.style.top = ''
			window.scrollTo(0, this.scrollY)
		}
	}
}

new BurgerMenu('.hamburger', '.menu', 100)
