import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore.js";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";

const stripePromise = loadStripe("pk_test_51SDMpC6i0gzcCUG6Pc5M5ejA9AOend3qwus36MsgmjhwHTZLxgrpsNBfXrWZFuBF0OQtV3noFZ5ywCkm3BEk9tdh007gyPWCph");

const OrderSummary = () => {
	const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

	const savings = subtotal - total;
	const formattedSubtotal = subtotal.toFixed(2);
	const formattedTotal = total.toFixed(2);
	const formattedSavings = savings.toFixed(2);

	const handlePayment = async () => {
		const stripe = await stripePromise;
		const res = await axios.post("/payment/create-checkout-session", {
			products: cart,
			couponCode: coupon ? coupon.code : null,
		});

		const session = res.data;
		const result = await stripe.redirectToCheckout({
			sessionId: session.id,
		});
		if (result.error) {
			console.error("Error:", result.error);
		}
	};

	return (
		<motion.div
			className='space-y-4 rounded-lg bg-black/20 p-4 mt-6 lg:mt-0 shadow-sm sm:p-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<p className='text-xl font-semibold text-black'>Order summary</p>

			<div className='space-y-4'>
				<div className='space-y-2'>
					<dl className='flex items-center justify-between gap-4 text-base font-medium text-black'>
						<dt>Original price</dt>
						<dd>${formattedSubtotal}</dd>
					</dl>

					{savings > 0 && (
						<dl className='flex items-center justify-between gap-4 text-base font-medium text-black'>
							<dt>Savings</dt>
							<d>-${formattedSavings}</d>
						</dl>
					)}

					{coupon && isCouponApplied && (
						<dl className='flex items-center justify-between gap-4 text-black'>
							<dt className='text-base font-normal '>Coupon ({coupon.code})</dt>
							<dd className='text-base font-medium'>-{coupon.discountPercentage}%</dd>
						</dl>
					)}
					<dl className='flex items-center justify-between gap-4 border-t border-gray-600 pt-2 text-base font-bold text-black'>
						<dt>Total</dt>
						<dd>${formattedTotal}</dd>
					</dl>
				</div>

				<motion.button
					className='flex w-full items-center justify-center rounded-lg bg-amber-300 px-5 py-2.5 text-sm font-medium text-black hover:bg-amber-400/80 focus:outline-none focus:ring-4 focus:ring-cyan-300'
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handlePayment}
				>
					Proceed to Checkout
				</motion.button>

				<div className='flex items-center justify-center gap-2'>
					<span className='text-sm font-normal text-black'>or</span>
					<Link
						to='/'
						className='inline-flex items-center gap-2 text-sm font-medium text-gray-800 underline hover:text-black hover:no-underline'
					>
						Continue Shopping
						<MoveRight size={16} />
					</Link>
				</div>
			</div>
		</motion.div>
	);
};
export default OrderSummary;