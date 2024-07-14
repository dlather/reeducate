// for page navigation & to sort on leftbar
export const ROUTES = [
  {
    title: "Top concepts",
    href: "top-concepts",
    items: [
      { title: "this", href: "/keyword-this" },
      { title: "call, apply & bind", href: "/call-apply-bind" },
      { title: "new", href: "/keyword-new" },
    ],
  },
];

export const page_routes = ROUTES.map(({ href, items }) => {
  return items.map((link) => {
    return {
      title: link.title,
      href: href + link.href,
    };
  });
}).flat();
