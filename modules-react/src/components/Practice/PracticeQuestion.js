import { useContext, useState } from "react";
import { Route, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Segment,
  Item,
  Divider,
  Button,
  Icon,
  Message,
  Menu,
  Header,
  Popup,
} from "semantic-ui-react";
import {PracticeContext}  from '../../context/PracticeContext';
import { getLetter } from "../../utils";
import { useStopwatch } from "react-timer-hook";
import Paths from "../../utils/paths";

export default function PracticeQuestion() {
  
  const [userSlectedAns, setUserSlectedAns] = useState(null);
  const { seconds, minutes, hours, pause } = useStopwatch({
    autoStart: true,
  });
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const {
    state: { question }, dispatch
  } = useContext(PracticeContext);
  const { id } = useParams();

  if (question === null) {
    return <Route render={() => <Navigate to={Paths.PRACTICE}/> }/>
  }

  const handleItemClick = (e, { name }) => {
    setUserSlectedAns(name);
    if (!isAnswerCorrect) {
      setIsSubmitted(false);
    }
  };

  const handleSubmit = () => {
    if (userSlectedAns === question.answer) {
      setIsAnswerCorrect(true);
      pause();
    }
    setIsSubmitted(true);
    setUserSlectedAns(null);
  };

  return (
    <Item.Header style={{marginTop:"4em"}}>
      <Container>
        <Segment>
          <Item.Group divided>
            <Item>
              <Item.Content>
                <Item.Extra>
                  <Header as="h1" block floated="left">
                    <Icon name="info circle" />
                    <Header.Content>
                      {`Question No.${id}`}
                    </Header.Content>
                  </Header>
                  <Button.Group size="massive" basic floated="right">
                    <Popup
                      content="Hours"
                      trigger={<Button active>{hours}</Button>}
                      position="bottom left"
                    />
                    <Popup
                      content="Minutes"
                      trigger={<Button active>{minutes}</Button>}
                      position="bottom left"
                    />
                    <Popup
                      content="Seconds"
                      trigger={<Button active>{seconds}</Button>}
                      position="bottom left"
                    />
                  </Button.Group>
                </Item.Extra>
                <br />
                <Item.Meta>
                  <Message size="huge" floating>
                    <b>{`Q. ${question.question}`}</b>
                  </Message>
                  <br />
                  <Item.Description>
                    <h3>Please choose one of the following answers:</h3>
                  </Item.Description>
                  <Divider />
                  <Menu vertical fluid size="massive">
                    {question.options.map((option, i) => {
                      const letter = getLetter(i);

                      return (
                        <Menu.Item
                          key={option}
                          name={option}
                          active={userSlectedAns === option}
                          onClick={handleItemClick}
                        >
                          <b style={{ marginRight: "8px" }}>{letter}</b>
                          {option}
                        </Menu.Item>
                      );
                    })}
                  </Menu>
                </Item.Meta>
                <Divider />
                <Item.Extra>
                  <Button
                    primary
                    onClick={(e) => {
                      dispatch({ type: "solve", payload: null });
                      navigate(Paths.PRACTICE);
                    }}
                    floated="left"
                    size="big"
                    labelPosition="left"
                    icon
                  >
                    <Icon name="left arrow"/> Back
                  </Button>
                  <Button
                    color={
                      isSubmitted ? (isAnswerCorrect ? "green" : "red") : "blue"
                    }
                    onClick={handleSubmit}
                    floated="right"
                    size="big"
                    disabled={!userSlectedAns || isAnswerCorrect}
                  >
                    {isAnswerCorrect ? <Icon name="checkmark" /> : "Submit"}
                  </Button>
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <br />
      </Container>
    </Item.Header>
  );
}
