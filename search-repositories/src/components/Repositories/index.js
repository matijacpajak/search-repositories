import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRepositories } from "../../api/hooks";
import RepositoryCard from "../RepositoryCard";

import "./style.css";

const Repositories = () => {
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const { route } = useParams();

  const { repos, error, loading } = useRepositories(route, sort, page);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    <div>{error.message}</div>;
  }

  if (!repos) {
    return;
  }

  return (
    <div className="Repositories">
      <div className="Sort">
        <p className="SortLabel">Sort by number of:</p>
        <select
          className="Select"
          onChange={(e) => setSort(e.target.value)}
          value={sort}
        >
          <option value="">Select</option>
          <option value="stars">Stars</option>
          <option value="forks">Forks</option>
        </select>
      </div>
      {repos.map((repo) => {
        return <RepositoryCard key={repo.id} route={route} repo={repo} />;
      })}
      <button
        disabled={page === 1}
        onClick={() => {
          setPage(page - 1);
        }}
      >
        Preview
      </button>
      <button disabled>{page}</button>
      <button
        disabled={page === 100}
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Repositories;
