//the whole list of projects
  const [blogData, setBlogData] = useState<BlogProp[]>([]);

  //state - pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //sets the page count - pagination
  const totalPages = Math.ceil(blogData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  //input search state
  const [searchQuery, setSearchQuery] = useState<string>("");

  //sliced projects - pagination
  const filteredBlogs = blogData.filter((value) =>
    value.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const currentBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  //pre-coded - pagination
  const getPaginationPages = (current: number, total: number) => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
    if (current >= total - 3)
      return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    return [1, "...", current - 1, current, current + 1, "...", total];
  };



  //JSX

    <div className="search-wrapper p-2 flex flex-row gap-3 items-center border border-gray-500 rounded-sm">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  const newValue = e.currentTarget.value;
                  setSearchQuery(newValue);
                  setCurrentPage(1);
                }}
                placeholder="Search projects.."
                maxLength={40}
                className="p-2 w-[20vw]  text-base"
              />
              <div
                className="cursor-pointer"
                onClick={() => {
                  setSearchQuery("");
                }}
              >
                <IoMdClose />
              </div>
            </div>


 <div className="flex flex-row gap-5 justify-center">
          <button
            disabled={currentPage === 1}
            className="border border-gray-500 p-5 cursor-pointer"
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            {"Prev"}
          </button>
          {getPaginationPages(currentPage, totalPages).map((page, index) =>
            page === "..." ? (
              <span key={`dots-${index}`} className="px-3 py-2 text-gray-400">
                ...
              </span>
            ) : (
              // number - pages buttons
              <button
                key={page}
                onClick={() => setCurrentPage(page as number)}
                className={`border border-gray-500 p-5 cursor-pointer ${
                  currentPage === page ? "bg-gray-300 font-bold" : ""
                }`}
              >
                {page}
              </button>
            ),
          )}

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            className="border border-gray-500 p-5 cursor-pointer"
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            {"Next"}
          </button>
        </div>