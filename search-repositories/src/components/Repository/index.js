import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ForkIcon from "../../icons/ForkIcon";
import StarIcon from "../../icons/StarIcon";

import "./style.css";
import "./../../base.css";
import { useRepository } from "../../api/hooks";
import axios from "axios";

const Repository = () => {
  const { owner, repository } = useParams();

  const [contributors, setContributors] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [err, setErr] = useState("");

  const { repo, error, loading } = useRepository(owner, repository);

  useEffect(() => {
    if (repo) {
      axios
        .all([axios.get(repo.contributors_url), axios.get(repo.languages_url)])
        .then((response) => {
          setContributors(response[0].data);
          const resLanguages = Object.keys(response[1].data);
          setLanguages(resLanguages);
        })
        .catch((error) => {
          setErr(error);
        });
    }
  }, [repo]);

  if (error) {
    <div>{error.message}</div>;
  }
  if (err) {
    <div>{err.message}</div>;
  }

  if (loading || !contributors || !languages) return <div>Loading...</div>;
  return (
    <div className="Repository">
      <div className="RepositoryInfo">
        <div className="RepositoryMainInfo">
          <h1 className="RepositoryName">{repo.name}</h1>
          <div className="CardMoreInfo">
            <div className="CardSingleInfo">
              <ForkIcon />
              {repo.forks_count}
            </div>
            <div className="CardSingleInfo" style={{ gap: "4px" }}>
              <StarIcon />
              {repo.stargazers_count}
            </div>
          </div>
        </div>
        <div className="RepositoryOwner">
          <img
            className="AvatarImg"
            style={{ marginBottom: "20px" }}
            src={repo.owner.avatar_url}
            alt="avatar"
            width={60}
            height={60}
          />
          <div>
            <span>created by </span>
            <span className="Owner">{repo.owner.login}</span>
          </div>
        </div>
      </div>
      <div className="RepositoryIssues">
        <p className="IssuesLabel">Open Issues: </p>
        <span>{repo.open_issues_count}</span>
      </div>
      <p className="ListTitle">Contributors: </p>
      <ul>
        {contributors.slice(0, 9).map((contributor) => (
          <li key={contributor.id} className="ListItem">
            {contributor.login}
          </li>
        ))}
      </ul>
      <p className="ListTitle">Languages: </p>
      <ul>
        {languages.slice(0, 9).map((lang) => (
          <li key={lang} className="ListItem">
            {lang}
          </li>
        ))}
      </ul>
      <div></div>
    </div>
  );
};

export default Repository;
