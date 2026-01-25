import { getMenu } from "../../../services/apiRestaurant";

export async function loaderMenuData() {
  const menu = await getMenu();
  return menu;
}
