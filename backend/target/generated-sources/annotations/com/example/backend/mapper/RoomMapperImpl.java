package com.example.backend.mapper;

import com.example.backend.common.model.GenreRoom;
import com.example.backend.model.dto.AnswerDto;
import com.example.backend.model.dto.QuestionDto;
import com.example.backend.model.dto.RoomDto;
import com.example.backend.model.dto.UserRoomDto;
import com.example.backend.model.entity.AnswerEntity;
import com.example.backend.model.entity.QuestionEntity;
import com.example.backend.model.entity.RoomEntity;
import com.example.backend.model.entity.UserRoomEntity;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-29T13:24:43+0700",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 18.0.2 (Amazon.com Inc.)"
)
@Component
public class RoomMapperImpl implements RoomMapper {

    @Override
    public RoomEntity dtoToEntity(RoomDto roomDto) {
        if ( roomDto == null ) {
            return null;
        }

        RoomEntity roomEntity = new RoomEntity();

        roomEntity.setName( roomDto.getName() );
        roomEntity.setCapacity( roomDto.getCapacity() );
        if ( roomDto.getType() != null ) {
            roomEntity.setType( Enum.valueOf( GenreRoom.class, roomDto.getType() ) );
        }
        roomEntity.setUrl( roomDto.getUrl() );
        roomEntity.setCode( roomDto.getCode() );
        roomEntity.setQuestions( questionDtoListToQuestionEntityList( roomDto.getQuestions() ) );
        roomEntity.setUserRoom( userRoomDtoListToUserRoomEntityList( roomDto.getUserRoom() ) );

        return roomEntity;
    }

    @Override
    public RoomDto entityToDto(RoomEntity roomEntity) {
        if ( roomEntity == null ) {
            return null;
        }

        RoomDto roomDto = new RoomDto();

        roomDto.setName( roomEntity.getName() );
        roomDto.setCapacity( roomEntity.getCapacity() );
        if ( roomEntity.getType() != null ) {
            roomDto.setType( roomEntity.getType().name() );
        }
        roomDto.setUrl( roomEntity.getUrl() );
        roomDto.setCode( roomEntity.getCode() );
        roomDto.setQuestions( questionEntityListToQuestionDtoList( roomEntity.getQuestions() ) );

        return roomDto;
    }

    protected AnswerEntity answerDtoToAnswerEntity(AnswerDto answerDto) {
        if ( answerDto == null ) {
            return null;
        }

        AnswerEntity answerEntity = new AnswerEntity();

        answerEntity.setText( answerDto.getText() );
        answerEntity.setCorrect( answerDto.isCorrect() );

        return answerEntity;
    }

    protected List<AnswerEntity> answerDtoListToAnswerEntityList(List<AnswerDto> list) {
        if ( list == null ) {
            return null;
        }

        List<AnswerEntity> list1 = new ArrayList<AnswerEntity>( list.size() );
        for ( AnswerDto answerDto : list ) {
            list1.add( answerDtoToAnswerEntity( answerDto ) );
        }

        return list1;
    }

    protected QuestionEntity questionDtoToQuestionEntity(QuestionDto questionDto) {
        if ( questionDto == null ) {
            return null;
        }

        QuestionEntity questionEntity = new QuestionEntity();

        questionEntity.setGenreQuestion( questionDto.getGenreQuestion() );
        questionEntity.setText( questionDto.getText() );
        questionEntity.setScore( questionDto.getScore() );
        questionEntity.setAnswer( answerDtoListToAnswerEntityList( questionDto.getAnswer() ) );

        return questionEntity;
    }

    protected List<QuestionEntity> questionDtoListToQuestionEntityList(List<QuestionDto> list) {
        if ( list == null ) {
            return null;
        }

        List<QuestionEntity> list1 = new ArrayList<QuestionEntity>( list.size() );
        for ( QuestionDto questionDto : list ) {
            list1.add( questionDtoToQuestionEntity( questionDto ) );
        }

        return list1;
    }

    protected UserRoomEntity userRoomDtoToUserRoomEntity(UserRoomDto userRoomDto) {
        if ( userRoomDto == null ) {
            return null;
        }

        UserRoomEntity.UserRoomEntityBuilder userRoomEntity = UserRoomEntity.builder();

        userRoomEntity.role( userRoomDto.getRole() );
        userRoomEntity.score( userRoomDto.getScore() );

        return userRoomEntity.build();
    }

    protected List<UserRoomEntity> userRoomDtoListToUserRoomEntityList(List<UserRoomDto> list) {
        if ( list == null ) {
            return null;
        }

        List<UserRoomEntity> list1 = new ArrayList<UserRoomEntity>( list.size() );
        for ( UserRoomDto userRoomDto : list ) {
            list1.add( userRoomDtoToUserRoomEntity( userRoomDto ) );
        }

        return list1;
    }

    protected AnswerDto answerEntityToAnswerDto(AnswerEntity answerEntity) {
        if ( answerEntity == null ) {
            return null;
        }

        AnswerDto answerDto = new AnswerDto();

        answerDto.setText( answerEntity.getText() );
        answerDto.setCorrect( answerEntity.isCorrect() );

        return answerDto;
    }

    protected List<AnswerDto> answerEntityListToAnswerDtoList(List<AnswerEntity> list) {
        if ( list == null ) {
            return null;
        }

        List<AnswerDto> list1 = new ArrayList<AnswerDto>( list.size() );
        for ( AnswerEntity answerEntity : list ) {
            list1.add( answerEntityToAnswerDto( answerEntity ) );
        }

        return list1;
    }

    protected QuestionDto questionEntityToQuestionDto(QuestionEntity questionEntity) {
        if ( questionEntity == null ) {
            return null;
        }

        QuestionDto questionDto = new QuestionDto();

        questionDto.setGenreQuestion( questionEntity.getGenreQuestion() );
        questionDto.setText( questionEntity.getText() );
        questionDto.setScore( questionEntity.getScore() );
        questionDto.setAnswer( answerEntityListToAnswerDtoList( questionEntity.getAnswer() ) );

        return questionDto;
    }

    protected List<QuestionDto> questionEntityListToQuestionDtoList(List<QuestionEntity> list) {
        if ( list == null ) {
            return null;
        }

        List<QuestionDto> list1 = new ArrayList<QuestionDto>( list.size() );
        for ( QuestionEntity questionEntity : list ) {
            list1.add( questionEntityToQuestionDto( questionEntity ) );
        }

        return list1;
    }
}
