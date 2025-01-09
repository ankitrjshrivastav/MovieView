import { unavailable } from "../../config/config";
import { Badge } from "@material-ui/core";
import "./SingleContent.css";
import ContentModal from "../ContentModal/ContentModal";
const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge badgeContent={vote_average} color="primary" />

      <img
        className="poster"
        src={poster ? `${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title}</b>
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>
    </ContentModal>
  );
};
export default SingleContent;
