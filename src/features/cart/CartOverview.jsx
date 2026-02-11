 import LinkButton from "../../ui/LinkButton";

function CartOverview() {
    return (
        <div className="flex items-center justify-between bg-stone-800 text-stone-200 p-4 uppercase text-sm md:text-base sm:px-6 ">
            <p className="font-semibold text-stone-300 space-x-2 sm:space-x-4">
                <span>23 pizzas</span>
                <span>{">>"}</span>
                <span>$23.45</span>
            </p>
            {/* <a href="#">Open cart &rarr;</a> */}
            <LinkButton to="/cart">Open cart &rarr;</LinkButton>
        </div>
    );
}

export default CartOverview;