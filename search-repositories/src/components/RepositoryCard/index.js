import { Link } from "react-router-dom";
import ForkIcon from "../../icons/ForkIcon";
import StarIcon from "../../icons/StarIcon";
import "./style.css";
import "./../../base.css";

const RepositoryCard = ({ repo, route }) => {
  return (
    <div className="Card">
      <div className="CardContent">
        <div>
          <Link className="CardLink" to={`/${repo.owner.login}/${repo.name}`}>
            <h1 className="CardName">{repo.name}</h1>
          </Link>
          <div className="CreatedBy">
            <span>created by </span>
            <span className="Owner">{repo.owner.login}</span>
            <img
              className="AvatarImg"
              src={repo.owner.avatar_url}
              alt="avatar"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
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
  );
};

export default RepositoryCard;
